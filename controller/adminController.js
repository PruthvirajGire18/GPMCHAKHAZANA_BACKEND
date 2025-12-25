import  Branch  from "../model/Branches.js";
import  Semester  from "../model/Semesters.js";
import  Subject  from "../model/Subjects.js";
export const createBranch = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Name & code required" });
    }

    const exists = await Branch.findOne({
      $or: [{ name }, { code }],
    });

    if (exists) {
      return res.status(400).json({ message: "Branch already exists" });
    }

    const branch = await Branch.create({ name, code });

    res.status(201).json({
      message: "Branch created successfully",
      branch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSemester = async (req, res) => {
  try {
    const { name, number, branchId } = req.body;

    if (!name || !number || !branchId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const branchExists = await Branch.findById(branchId);
    if (!branchExists) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const exists = await Semester.findOne({
      branchId,
      number,
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Semester already exists for this branch" });
    }

    const semester = await Semester.create({ name, number, branchId });

    res.status(201).json({
      message: "Semester created successfully",
      semester,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name, code, credits, branchId, semesterId } = req.body;

    if (!name || !code || !branchId || !semesterId) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await Subject.findOne({
      $or: [{ name }, { code }],
      semesterId,
    });

    if (exists) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const subject = await Subject.create({
      name,
      code,
      credits,
      branchId,
      semesterId,
    });

    res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const updated = await Subject.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Subject updated successfully",
      updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await Subject.findByIdAndDelete(id);

    res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

