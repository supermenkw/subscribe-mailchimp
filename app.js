const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    // Make sure fields are filled
    if (!email) {
        res.redirect('/fail.html');
        return;
}

    // Construct req data
    const mailchimpData = {
        members: [
        {
            email_address: email,
            status: 'subscribed',
        }
        ]
    };

    const mailchimpPostData = JSON.stringify(mailchimpData);

    fetch('https://us17.api.mailchimp.com/3.0/lists/<LIST_ID>', {
            method: 'POST',
            headers: {
            Authorization: 'auth <API_KEY>'
            },
            body: mailchimpPostData
        })
        .then(res.statusCode === 200 ?
            res.redirect('/success.html') :
            res.redirect('/fail.html'))
        .catch(err => console.log(err))
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
