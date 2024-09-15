const router = require("express").Router();
const {
  Intro,
  About,
  Experience,
  Projects,
  Contact,
} = require("../models/portfolioModel");
const User = require("../models/userModel");

// Get portfolio data
router.get("/get-portfolio", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const experiences = await Experience.find();
    const projects = await Projects.find();
    const contacts = await Contact.find();

    res.status(200).send({
      intro: intros[0],
      abouts: abouts[0],
      experiences: experiences,
      projects: projects,
      contacts: contacts[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update intro data
router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro data updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update about data
router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: about,
      success: true,
      message: "About data updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// add experience data
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience data added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update experience data
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience data updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete experience data
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience data deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// add project data
router.post("/add-project", async (req, res) => {
  try {
    const project = new Projects(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project data added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update project data
router.post("/update-project", async (req, res) => {
  try {
    const project = await Projects.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: project,
      success: true,
      message: "Project data updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete project data
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Projects.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project data deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update contact data
router.post("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact data updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login successfully",
      });
    } else {
      res.status(401).send({
        data: user,
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
