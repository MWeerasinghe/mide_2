const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../TokenCheck/verifyToken');
const { User } = require('../models');
const { Teacher6 } = require('../models/teacher_6');
const { ValidateRegister } = require('../Validates/userValidate')
const router = express.Router();
const sequelize = require('../models/sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


//__________________get All Teachers_____________________
router.get('/getAllTeachers', async (req, res) => 
    {
        try 
        {
            const query = 'SELECT * FROM teachers_6';
            const [teachers, metadata] = await sequelize.query(query);
    
            console.log(teachers);
            res.status(200).json({ success: true, data: teachers });
        } 
        catch (error) 
        {
            console.error('Error fetching teachers:', error);
            res.status(500).json({ success: false, message: 'An error occurred while retrieving teachers.', error: error.message });
        }
    });


//______________get specific teacher______________________
router.get('/getTeacher', async (req, res) => 
{
    try 
    {
        const { user_id } = req.query; // Extract user_id from query parameters
        if (!user_id) {
            return res.status(400).json({ success: false, message: "user_id is required" });
        }

        const query = `SELECT * FROM assign_teachers WHERE user_id = :user_id`;
        const teachers = await sequelize.query(query, { 
            replacements: { user_id }, 
            type: sequelize.QueryTypes.SELECT 
        });

        res.status(200).json({ success: true, data: teachers });
    } 
    catch (error) 
    {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while retrieving teachers.', 
            error: error.message 
        });
    }
});
    


//_________________Upload materials________________________________
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./resources"); // Save files in the "resources" directory
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`); // Use a timestamped filename
        },
    });
    
    // Initialize multer with storage
    const upload = multer({ storage });
    
    // Route to upload materials
    router.post('/uploadMaterials', upload.single('file'), async (req, res) => {
        try {
            const { user_id, year, grade, term, subject } = req.body;
    
            const today = new Date();
            const date = `${today.getMonth() + 1}/${today.getDate()}`;
    
            // Validate required fields
            if (!user_id || !year || !grade || !term || !subject || !req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'All fields and a file are required.' 
                });
            }
    
            // Extract filename from the uploaded file
            const note = req.file.filename;
    
            // Determine the table based on the grade
            let table;
            switch (grade) {
                case '6': table = 'teachers_6'; break;
                case '7': table = 'teachers_7'; break;
                case '8': table = 'teachers_8'; break;
                case '9': table = 'teachers_9'; break;
                case '10': table = 'teachers_10'; break;
                case '11': table = 'teachers_11'; break;
                default:
                    return res.status(400).json({ 
                        success: false, 
                        message: 'Invalid grade provided.' 
                    });
            }
    
            // Insert material details into the database
            const query = `
                INSERT INTO ${table} 
                (user_id, grade, year, date, term, note, subject) 
                VALUES 
                (:user_id, :grade, :year, :date, :term, :note, :subject)
            `;
            const result = await sequelize.query(query, { 
                replacements: { user_id, grade, year, date, term, note, subject }, 
                type: sequelize.QueryTypes.INSERT 
            });
    
            res.status(200).json({ 
                success: true, 
                message: 'Material uploaded successfully.', 
                data: result 
            });
        } catch (error) {
            console.error('Error uploading materials:', error);
            res.status(500).json({ 
                success: false, 
                message: 'An error occurred while uploading materials.', 
                error: error.message 
            });
        }
    });

//____________get All students Results for specific subject, year, grade__________
router.get('/getAllStudentsData', async (req, res) => {
    try {
        const { year, grade, subject, user_id } = req.query;

        if(!year || !grade || !subject) 
        {
            return res.status(400).json({ success: false, message: 'Year, grade, and subject are required.' });
        }

        let querys;
        if (subject === "a") {
            querys = 'SELECT * FROM abhidharmaya WHERE year = :year AND grade = :grade';
        } else if (subject === "b") {
            querys = 'SELECT * FROM buddha_charithaya WHERE year = :year AND grade = :grade';
        } else if (subject === "p") {
            querys = 'SELECT * FROM pali WHERE year = :year AND grade = :grade';
        } else {
            return res.status(400).json({ success: false, message: 'Incorrect subject.' });
        }

        const result = await sequelize.query(querys, { replacements: { year, grade }, type: sequelize.QueryTypes.SELECT });
        if(result.length > 0)
        {
            await Promise.all(
                result.map(async (record) => 
                {
                  const user = await sequelize.query('SELECT name FROM "Users" WHERE id = :user_id', { replacements: { user_id: record.user_id }, type: sequelize.QueryTypes.SELECT });
                  record.name = user.length > 0 ? user[0].name : "Unknown";
                })
              );
            return res.status(200).json({ success: true, data: result });
        }
        return res.status(200).json({ success: false });
    } 
    catch (error) 
    {
        console.error('Error retrieving student data:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while retrieving student data.', 
            error: error.message 
        });
    }
});

//___________________Set student data_____________________________
router.post('/setStudentGrade', async (req, res) => 
{
    try {
        const { id, subject, year, grade, t1_result, t2_result, t3_result } = req.body;
    
        if (!id || !subject || !year || !grade) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: id, subject, year, or grade.',
            });
        }
    
        let querys;
        if (subject === "a") {
            querys = `
                UPDATE abhidharmaya 
                SET grade = :grade, t1_result = :t1_result, t2_result = :t2_result, t3_result = :t3_result
                WHERE id = :id AND year = :year`;
        } else if (subject === "b") {
            querys = `
                UPDATE buddha_charithaya 
                SET grade = :grade, t1_result = :t1_result, t2_result = :t2_result, t3_result = :t3_result
                WHERE id = :id AND year = :year`;
        } else if (subject === "p") {
            querys = `
                UPDATE pali 
                SET grade = :grade, t1_result = :t1_result, t2_result = :t2_result, t3_result = :t3_result
                WHERE id = :id AND year = :year`;
        } else {
            return res.status(400).json({ success: false, message: 'Incorrect subject.' });
        }
    
        // Execute the query with replacements
        const result = await sequelize.query(querys, {
            replacements: { id, year, grade, t1_result, t2_result, t3_result },
            type: sequelize.QueryTypes.UPDATE,
        });
    
        // Check the result
        if (result[1] > 0) { // result[1] gives the number of affected rows
            return res.status(200).json({
                success: true,
                message: 'Student grades updated successfully.',
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'No matching record found for the provided ID and year.',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating student grades.',
            error: error.message,
        });
    }    
});



//___________________Set student Attendance_____________________________
router.post('/setStudentAttendance', async (req, res) => 
    {
        try {
            const id = req.body.id;
            const subject = req.body.subject;
            const t1_attend = req.body.term1;
            const t2_attend = req.body.term2;
            const t3_attend = req.body.term3;

        console.log('aaaa');

            console.log(id, subject, t1_attend,t2_attend, t3_attend);
        
            if(id==null || t1_attend==null || t2_attend==null || t3_attend==null || subject==null) 
            {
            console.log('ccccc');

                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: id, term1, term2 or term3 attendance counts.',
                });
            }
        console.log('llll');
            let querys;
            if (subject === "a") {
                querys = `
                    UPDATE abhidharmaya 
                    SET t1_attend = :t1_attend, t2_attend = :t2_attend, t3_attend = :t3_attend,
                    WHERE id = :id`;
            } else if (subject === "b") {
                querys = `
                    UPDATE buddha_charithaya 
                    SET t1_attend = :t1_attend, t2_attend = :t2_attend, t3_attend = :t3_attend
                    WHERE id = :id`;
            } else if (subject === "p") {
                querys = `
                    UPDATE pali 
                    SET t1_attend = :t1_attend, t2_attend = :t2_attend, t3_attend = :t3_attend
                    WHERE id = :id`;
            } else {
                return res.status(400).json({ success: false, message: 'Incorrect subject.' });
            }
        
        console.log('mmmmm');

            // Execute the query with replacements
            const result = await sequelize.query(querys, {
                replacements: { id, t1_attend, t2_attend, t3_attend},
                type: sequelize.QueryTypes.UPDATE,
            });
        
        console.log('bbbbbbb');

            // Check the result
            if (result[1] > 0) 
            {
                return res.status(200).json({
                    success: true,
                    message: 'Student attendance updated successfully.',
                });
            } 
            else 
            {
                return res.status(404).json({
                    success: false,
                    message: 'No matching record found for the provided ID.',
                });
            }
        } 
        catch (error) 
        {
        console.log('xxxxxx');

            res.status(500).json({
                success: false,
                message: 'An error occurred while updating student attendance.',
                error: error.message,
            });
        }    
    });
    

//_____________Add announcements________________________________
router.post('/addAnnouncement', async (req, res) => 
{
    try
    {
        const {user_id, year, grade, subject, date, announcement} = req.body;
        // Validate required fields
        if (!user_id || !year || !grade || !subject || !date || !announcement)
        {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const table = "announcement";
        const query = `
        INSERT INTO ${table}
        (user_id, year, grade, subject, announce, date)
        VALUES
        (:user_id, :year, :grade, :subject, :announcement, :date)
        `;

        // Execute the query
        const result = await sequelize.query(query, { 
            replacements: { user_id, year, grade, subject, announcement, date },
            type: sequelize.QueryTypes.INSERT 
        });

        res.status(200).json({ success: true, message: "Announcement saved successfully.", data: result });
    }
    catch (error)
    {
        res.status(500).json({ success: false, message: "An error occurred while saving the announcement.", error: error.message });
    }
});


//________________________open pdf_____________________________
router.get('/openpdf/:fileName', async (req, res) => {
    try {
        const { fileName } = req.params;

        if (!fileName) 
        {
            return res.status(400).json({ success: false, message: "File name is required." });
        }

        const resourceDir = path.join(__dirname, '../resources');

        const filePath = path.join(resourceDir, fileName);

        if (!fs.existsSync(filePath)) 
        {
            return res.status(404).json({ success: false, message: "File not found." });
        }

        // Send the file as a response
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ success: false, message: "Error serving the file." });
            }
        });
    } catch (error) {
        console.error("Error in /students/:fileName:", error);
        res.status(500).json({ success: false, message: "An error occurred.", error: error.message });
    }
});
    
module.exports = router;