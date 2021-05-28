const express = require("express");
const router = express.Router();
const members = require("../../Members");
const auth = require("../../middleware/auth");
const uuid = require("uuid");

//GETS ALL MEMBERS
router.get("/", (req, res) => {
  console.log("members page");
  res.json(members); // JSON.STRINGIFY NOT REQUIRED
});

router.get("/:id", (req, res) => {
  //res.send(req.params.id);
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `${req.params.id} is not valid id` });
    res.send("Enter the correct id");
  }
});

// Create Member
router.post("/", (req, res) => {
  // res.send(req.body);

  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please provide name and email" });
  }

  members.push(newMember);
  res.json(members);
});

// UPDATE MEMBER
router.put("/:id", (req, res) => {
  //res.send(req.params.id);
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : updMember.email;
        res.json({ msg: "Members updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `${req.params.id} is not valid id` });
    res.send("Enter the correct id");
  }
});

// DELETE MEMBER

router.delete("/:id", (req, res) => {
  //res.send(req.params.id);
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id),
      ),
    });
  } else {
    res.status(400).json({ msg: `${req.params.id} is not valid id` });
    res.send("Enter the correct id");
  }
});

// router.get("/", (req, res) => {
//   //res.send("<h1>Hello Ayushi</h1>");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// OTHER ROUTES
router.get("/users", auth, (req, res) => {
  console.log("users page");
  console.log("Is user authorized: ", req.admin);
  res.send("<h1>USERS PAGE</h1>");

  //MIDDILEWARE SPECIFIC TO THIS PARTICULAR ACTION : auth (passes on argument)
});

router.get("/posts", (req, res) => {
  console.log("posts page");
  res.send("<h1>POSTS PAGE</h1>");
});

module.exports = router;
