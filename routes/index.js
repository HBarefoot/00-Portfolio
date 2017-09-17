const express = require('express');
const router = express.Router();
const mailer = require('nodemailer')

// requiring project model
let projects = require('../model/project');
// requiring quotes model
let quotes = require('../model/quotes');
// requiring email&users model
let email_users = require('../model/email_users');

// requiring admin model
// let hb = require('../model/hb');
let hb = require('../hb');


/* GET home page. */
router.get('/', function(req, res, next) {
  let pictures = {}
  pictures.url = []
  pictures.name = []
  pictures.id = []
  projects.find({}, (err, project) => {

    for (let key in project){
      pictures.url.push(project[key].picturePath )
      pictures.name.push(project[key].projectName)
      pictures.id.push(project[key]._id)
    }
    // console.log(pictures.id)
    res.render('index', {
      title: 'Henry Barefoot | Portfolio | Full Stack Developer',
      path: pictures.url,
      projectName: pictures.name,
      projectID: pictures.id
    });
  })
});



/* GET project detail page. */
router.get('/detail/:id', function(req, res, next) {
  projects.findById(req.params.id, (err, detail) => {
    if(err) throw err

    let technologies = []
    let currentId = detail._id

    technologies = detail.Technologies.split(" ")
    // console.log(currentId)
    res.render('detail', {
      title: 'Henry Barefoot | Portfolio | Projects Detail',
      detail: detail,
      technologies: technologies,
      currentId: currentId
    });
  })
});


// GET next project details view
router.get('/detail/next/:id', (req, res, next) => {
  projects.findById(req.params.id, (err, data) => {
    if (err) throw err.message

    let id = data.id,
    last,
    next;

    projects.find().exec((err, lenght) => {
      let l = objLen(lenght)
      last = getLast(id)

      console.log(last)

      if ( last === 10 ) {
        last = 2
        next = replaceAt(id, 23, last);
        projects.findById(next, (err, detail) => {
          if (err) throw err

          res.render('detail', {
            title: 'Henry Barefoot | Portfolio | Projects Detail',
            detail: detail,
            technologies: detail.Technologies.split(" "),
            currentId: detail._id
          })
        })
      } else {
        next = replaceAt(id, 23, last);
        projects.findById(next, (err, detail) => {
          if (err) throw err

          res.render('detail', {
            title: 'Henry Barefoot | Portfolio | Projects Detail',
            detail: detail,
            technologies: detail.Technologies.split(" "),
            currentId: detail._id
          })
        })
      }
    })
  })
})



// GET next project details view
router.get('/detail/previous/:id', (req, res, next) => {
  projects.findById(req.params.id, (err, data) => {
    if (err) throw err.message

    let id = data.id,
    last,
    next;

    projects.find().exec((err, lenght) => {
      let l = objLen(lenght),
      prev = getPrev(id)

      console.log(prev)

      if ( prev === 1 ) {
        prev = l + 1
        next = replaceAt(id, 23, prev);
        projects.findById(next, (err, detail) => {
          if (err) throw err

          res.render('detail', {
            title: 'Henry Barefoot | Portfolio | Projects Detail',
            detail: detail,
            technologies: detail.Technologies.split(" "),
            currentId: detail._id,
            projectUrl: detail.projectUrl
          })
        })
      } else {
        next = replaceAt(id, 23, prev);
        projects.findById(next, (err, detail) => {
          if (err) throw err

          res.render('detail', {
            title: 'Henry Barefoot | Portfolio | Projects Detail',
            detail: detail,
            technologies: detail.Technologies.split(" "),
            currentId: detail._id
          })
        })
      }
    })
  })
})


// Favorites quotes
router.get('/quotes', (req, res, next) => {
  quotes.find({}, (err, quote) => {
    res.send(quote)
  })
})


// profile page
router.get('/profile', function(req, res, next) {
  let admin = {}
  admin.name = ""
  admin.aboutMe = ""
  admin.certification_name = []
  admin.cert_link_img = []
  admin.skills = []

  for (let key in hb){
    admin.name = hb[key].name
    admin.aboutMe = hb[key].about_me
    admin.certification_name.push(hb[key].certification_name)
    admin.cert_link_img.push(hb[key].cert_img_link)
    admin.skills.push(hb[key].skills)
  }
  //  res.send(admin.aboutMe)
  res.render('profile', {
    name: admin.name,
    aboutMe: admin.aboutMe,
    title: "Profile Page | HBarefoot | Portfolio",
    imgLink: admin.cert_link_img[0],
    skills: admin.skills[0],
    certName: admin.certification_name[0]
  })
});



// contactme router
router.get('/contactme', (req, res, next) => {
  res.render('contactme', {title: 'Contact Me!'})
})


// contactme POST router
router.post('/contactme', (req, res, next) => {
  if (!req.body) { console.error("Empty Form") }

  let name = req.body.name
  let email = req.body.email
  let comment = req.body.comment
  let emailAdmin = ''
  for (let key in hb) {
      emailAdmin = hb[key].email
  }

  console.dir(emailAdmin)
  // email for admin
  //sending email
  var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'someemail@gmail.com',
      pass: 'mailsender87'
    },
    secure: true
  })
  var mailOptions = {
    from: 'someemail@gmail.com',
    to: emailAdmin,
    subject: 'New email',
    text: 'New emails check your dashboard.\n Name: ' + name + '\n' + 'Email: ' + email + '\n' +
    'Comment: ' + comment
  }

  transporter.sendMail(mailOptions, function(err, info){
    if (err){
      throw err
    } else {
      console.log('email sent: ' + info.response)
    }
  })



  // email for user
  //sending email
  var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'someemail@gmail.com',
      pass: 'password'
    },
    secure: true
  })
  var mailOptions = {
    from: 'someEmail@gmail.com',
    to: email,
    subject: 'Thank you ' + name + '!',
    text: 'I\'ll contact you soon.'
  }

  transporter.sendMail(mailOptions, function(err, info){
    if (err){
      throw err
    } else {
      console.log('email sent: ' + info.response)
    }
  })

  res.render(' thanks_you.pug', {title: 'Thank !!! | Profile ', name: name })
})











// repling char at some index
function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

// getting the last
function getLast(str){
  return Number(str.charAt(23)) + 1;
}

// getting the previous
function getPrev(str){
  return Number(str.charAt(23)) - 1;
}

// Getting the lenght of an object
function objLen(obj){
  var lenght = 0;
  for (let key in obj){
    if (obj.hasOwnProperty(key)) lenght ++;
  }
  return lenght;
}


module.exports = router;
