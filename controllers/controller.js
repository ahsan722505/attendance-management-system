const { json } = require("express");
const Student = require("../models/Student");

exports.getIndex = (req, res, next) => {
  res.render("index");
};
exports.markAttendence = (req, res, next) => {
  Student.find()
    .then((students) => {
      res.render("attendence", {
        students: students,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.submit = (req, res, next) => {
  let present = req.body.present;
  if (typeof present === "string") {
    present = [present];
  }
  if (typeof present === "undefined") {
    present = [];
  }

  Student.find()
    .then((students) => {
      students.forEach((student) => {
        let exist = present.some((id) => {
          return id == student.id;
        });
        if (exist) {
          student.presents += 1;
          student.save();
        } else {
          student.absents += 1;
          student.save();
        }
      });
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.add = (req, res, next) => {
  res.render("add", { validation: false });
};
exports.addSubmit = (req, res, next) => {
  let last;
  Student.find()
    .then((students) => {
      if (students.length == 0) {
        last = 1;
      } else {
        last = students[students.length - 1].rollno + 1;
      }
      const student = new Student({
        name: req.body.fName,
        presents: 0,
        absents: 0,
        rollno: last,
      });
      return student.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.dropSubmit = (req, res, next) => {
  Student.findOne({ rollno: req.body.rollno })
    .then((student) => {
      // console.log(student);
      if (!student) {
        res.render("add", { validation: true });
      } else {
        Student.findByIdAndDelete(student.id)
          .then(() => {
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })

    .catch((err) => {
      console.log(err);
    });
};
