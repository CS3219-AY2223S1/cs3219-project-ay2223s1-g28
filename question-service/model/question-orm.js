import { getAllQuestions, createQuestion, getQuestionById, getQuestionByDifficulty, deleteQuestionById } from './repository.js';

// Get all interview question in the database
export async function ormGetAllQuestions() {
    try {
        const question = await getAllQuestions();
        return question;
    } catch(err) {
        console.log("ERROR: Could not get all questions");
        return { err };
    } 
}

// Creates new interview question in the database
export async function ormCreateQuestion(title, difficulty, categories, content) {
    try {
        const newQuestion = await createQuestion({ title, difficulty, categories, content });
        newQuestion.save();
        return true;
    } catch(err) {
        console.log("ERROR: Could not create new question");
        return { err };
    }
}

// Get interview question in the database by id
export async function ormGetQuestionById(id) {
    try {
        // question is the question document with id
        const question = await getQuestionById(id);
        return question;
    } catch(err) {
        console.log("ERROR: Could not get question by id");
        return { err };
    } 
}

// Get interview question in the database by difficulty
export async function ormGetQuestionByDifficulty(difficulty) {
    try {
        // question is the question document with difficulty
        const question = await getQuestionByDifficulty(difficulty);
        return question;
    } catch(err) {
        console.log("ERROR: Could not get question by difficulty");
        return { err };
    } 
}

// Delete interview question in the database by id
export async function ormDeleteQuestionById(id) {
    try {
        const res = await deleteQuestionById(id);
        return res.deletedCount == 1;
    } catch(err) {
        console.log("ERROR: Could not delete question by id");
        return { err };
    }
}