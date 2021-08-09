const express = require ('express');
const uuid = require('uuid');
const router = express.Router();
const students = require('../../Students');



//This route gets all students
router.get('/', (req, res)=>res.json(students));


// Get single Student
router.get('/:id', (req, res)=>{
	const found = students.some(student => student.id === parseInt(req.params.id));
	// res.send(req.params.id);

	if (found){
	res.json(students.filter(students => students.id === parseInt(req.params.id)));
	} else{
		res.status(400).json({msg:`no student with the id of ${req.params.id}`});
	}
});

// Create a student
router.post('/',(req, res)=>{
    const newStudent = {
        id : uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newStudent.name || !newStudent.email){
       return res.status(400).json({msg:'please incude name and email'});
    }
    students.push(newStudent);
    // res.json(students);
	res.redirect('/');
});

// Update Student record
// Get single Student
router.put('/:id', (req, res)=>{
	const found = students.some(student => student.id === parseInt(req.params.id));
	// res.send(req.params.id);

	if (found){
	const updStudent = req.body;
    students.forEach(student => {
        if (student.id === parseInt(req.params.id)){
            student.name = updStudent.name? updStudent.name : student.name;
            student.email = updStudent.email? updStudent.email: student.email;
            res.json({msg:'Student record is updated', student});
        }
    });
	} else{
		res.status(400).json({msg:`no student with the id of ${req.params.id}`});
	}
});



// Delete a student record

router.delete('/:id', (req, res)=>{
	const found = students.some(student => student.id === parseInt(req.params.id));
	// res.send(req.params.id);

	if (found){
	res.json({msg:'Student is deleted', students: students.filter(students => students.id !== parseInt(req.params.id))});
	} else{
		res.status(400).json({msg:`no student with the id of ${req.params.id}`});
	}
});
module.exports= router;