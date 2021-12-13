const functions = require('firebase-functions')
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp()
require('dotenv').config()
const db = admin.firestore();

exports.sendEmailNotification = functions.firestore.document('orders/{docId}')
  .onCreate((snap, ctx) => {
    const data = snap.data();
    debugger;
    console.log(data)
    let authData = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'dlevy28@gmail.com',
        pass: 'iydsn2803',
      }
    });
    authData.sendMail({
      from: 'dlevy28@gmail.com',
      to:  ` ortalooshp@gmail.com , dlevy28@gmail.com `,
      subject: 'ההזמנה הושלמה בהצלחה',
      html: '<b>אורח יקר שלום , </b><br /><br />קיבלנו את הזמנתך ואנו נרגשים לארח אותך אצלנו בחצר ולהעניק לך חווית אירוח ברמה הגבוהה ביותר, <br /> '+
        ' <br/>אנו שומרים לך את התאריך המבוקש למשך כ-15 דקות מרגע ביצוע ההזמנה.<br /> <br /><img src="cid:flashYLogo" alt="flashYLogo" width="150"/>',
      attachments: [
        {
          filename: 'flashYLogo.png',
          path: __dirname + '/images/flashYLogo.png',
          cid: 'flashYLogo',
          width: 100
        }
      ]
      }).then(res => console.log('successfully sent that mail', `${data.email}`)).catch(err => console.log(err));

  });

exports.writeToFirestore = functions.firestore.document('orders/{docId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    if (newValue.paymant === true && previousValue.paymant === false) {
      //console.log(newValue, 'newValue');
      // console.log(previousValue, 'previousValue');

      const usersRef = db.collection('users');
      const snapshot = await usersRef.where('id', 'in', [newValue.uidChef,newValue.uidClint]).get();
      let chefUser;
      if (!snapshot[0]) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        if (newValue.uidChef === doc.id) {
           chefUser = doc.data();
          console.log(chefUser);
          this.sendEmailNotification()
        }

      });


    } else {
      console.log('לא בוצע שינוי')
    }


  });
