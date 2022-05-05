const Content = require("../models/Content");
const Category = require("../models/Category");
const User = require("../models/User");
const sendEmail = require("../sendEmail");

module.exports.addContent = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const newCategory = [];
    for (const element of category) {
      const newCat = await Category.findOne({ id: element });
      if (newCat) newCategory.push(newCat._id.toString());
      else {
        throw new Error("Category with id " + element + " not found");
      }
    }

    const newContent = new Content({
      title,
      content,
      category: newCategory,
    });

    await newContent.save();

    const users = await User.find({
      topics: { $all: newCategory },
    })
      .populate("topics", "title -_id")
      .select("email name -_id -topics");

    await sendEmail(title, content, users);

    res.status(200).json({
      message: "Content added successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getContent = async (_req, res) => {
  try {
    const contents = await Content.find().populate("category", "title -_id");

    res.status(200).json({
      contents,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
