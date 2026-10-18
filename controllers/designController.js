const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const Design = require("../models/designModel");
const UserImage = require("../models/userImageModel");
const DesignImage = require("../models/designImageModel");
const BackgroundImage = require("../models/backgroundImageModel");
const Template = require("../models/templateModel");
const {
  mongo: { ObjectId },
} = require("mongoose");

// Delivery URL that lets Cloudinary pick the best format (WebP/AVIF) and
// compression level for the requesting browser.
const optimizedUrl = ({ public_id }) =>
  cloudinary.url(public_id, {
    secure: true,
    fetch_format: "auto",
    quality: "auto",
    urlAnalytics: false,
  });

class DesignController {
  createDesign = async (req, res) => {
    const form = formidable({});
    const { _id } = req.userInfo;
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
      const [fields, files] = await form.parse(req);
      const { image } = files;
      const url = optimizedUrl(
        await cloudinary.uploader.upload(image[0].filepath),
      );
      const design = await Design.create({
        user_id: _id,
        components: [JSON.parse(fields.design[0])],
        image_url: url,
      });
      return res.status(200).json({ design });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getUserDesign = async (req, res) => {
    const { designId } = req.params;
    try {
      const design = await Design.findById(designId);
      return res.status(200).json({ design: design.components });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updateUserDesign = async (req, res) => {
    const form = formidable({});
    const { designId } = req.params;
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
      const [fields, files] = await form.parse(req);
      const { image } = files;

      const components = JSON.parse(fields.design[0]).design;

      const oldDesign = await Design.findById(designId);

      if (oldDesign) {
        if (oldDesign.image_url) {
          const splitImage = oldDesign.image_url.split("/");
          const imageFile = splitImage[splitImage.length - 1];
          const imageName = imageFile.split(".")[0];
          await cloudinary.uploader.destroy(imageName); //destroy old design
        }
        const url = optimizedUrl(
          await cloudinary.uploader.upload(image[0].filepath),
        );
        await Design.findByIdAndUpdate(designId, {
          image_url: url,
          components: components,
        });
        return res.status(200).json({ message: "Save image successfully." });
      } else {
        return res.status(400).json({ message: "Design not found." });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  addUserImage = async (req, res) => {
    const { _id } = req.userInfo;
    const form = formidable({});
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    try {
      const [_, files] = await form.parse(req);
      const { image } = files;
      const url = optimizedUrl(
        await cloudinary.uploader.upload(image[0].filepath),
      );

      const userImage = await UserImage.create({
        user_id: _id,
        image_url: url,
      });
      return res
        .status(201)
        .json({ message: "Add image successfully.", userImage });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getUserImage = async (req, res) => {
    const { _id } = req.userInfo;
    try {
      const images = await UserImage.find({ user_id: new ObjectId(_id) });
      return res.status(200).json({
        images,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getBackgroundImage = async (req, res) => {
    try {
      const images = await BackgroundImage.find({});
      return res.status(200).json({
        images,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getDesignImage = async (req, res) => {
    try {
      const images = await DesignImage.find({});
      return res.status(200).json({
        images,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getUserDesigns = async (req, res) => {
    const { _id } = req.userInfo;
    try {
      const designs = await Design.find({ user_id: new ObjectId(_id) }).sort({
        createdAt: -1,
      });
      return res.status(200).json({
        designs,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  deleteUserImage = async (req, res) => {
    const { designId } = req.params;
    try {
      await Design.findByIdAndDelete(designId);
      return res.status(200).json({ message: "Delete design successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getTemplates = async (req, res) => {
    try {
      const templates = await Template.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ templates });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  addUserTemplate = async (req, res) => {
    const { _id } = req.userInfo;
    const { templateId } = req.params;
    try {
      const template = await Template.findById(templateId);
      const design = await Design.create({
        components: template.components,
        user_id: _id,
        image_url: template.image_url,
      });
      return res.status(200).json({ design });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new DesignController();
