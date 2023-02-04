import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Wrong format email').isEmail(),
  body('password', 'Min characters 5').isLength({ min: 5 }),
]

export const registerValidation = [
  body('email', 'Wrong format email').isEmail(),
  body('password', 'Min characters 5').isLength({ min: 5 }),
  body('fullName', 'Min characters 2').isLength({ min: 2 }),
  body('avatarURL', 'Wrong URL').optional().isURL(),
]

export const movieCreateValidation = [
  body('title', 'Enter title').isLength({ min: 3 }).isString(),
  body('description', 'Enter description').isLength({ min: 5 }).isString(),
  body('type', 'Select type').isString(),
  // body('imageURL', 'Wrong URL').optional().isString(),
]

export const vacancyCreateValidation = [
  body('logo', 'Logo is required').isString(),
  body('background', 'Background is required').isString(),
  body('jobTitle', 'Select is required').isLength({ min: 2 }).isString(),
  body('jobIndustries', 'Industries is required'),
  body('jobPositions', 'Position is required'),
  body('jobSalary', 'Salary is required'),
  body('jobExperience', 'Experience is required'),
  body('jobLocation', 'Location is required'),
  body('jobCity', 'City for job is required'),
  body('jobDescription', 'Description your vacancy is required'),
]