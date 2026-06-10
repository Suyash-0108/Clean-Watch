import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({
      createdAt: -1,
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};