import express from "express";
import {createBranch,createSemester,createSubject,editSubject,deleteSubject} from "../controller/adminController.js"
const router=express.Router();
router.post("/create-branch",createBranch);
router.post("/create-semester",createSemester);
router.post("/create-subject",createSubject);
router.put("/edit-subject/:id",editSubject);
router.delete("/delete-subject/:id",deleteSubject);
export default router;