const coursesInput = document.querySelector("#courses");
const startButton = document.querySelector("#startCalculator");
const courseInputs = document.querySelector("#courseInputs");

startButton.addEventListener("click", function () { const numberOfCourses = Number(coursesInput.value);  courseInputs.innerHTML = "";      for(let i = 1; i <= numberOfCourses; i++) { courseInputs.innerHTML +=   `   <div>   <lable>Course ${i}:</lable> <input type="number" placeholder="Credit Hours"></input> <input type ="number" placeholder="Grade Points"></input></div>
`;
}
});
const calculateButton = document.querySelector("#calculateCGPA");
const result = document.querySelector("#result");

calculateButton.addEventListener("click", function () {
const inputs = courseInputs.querySelectorAll("input");

let totalGradePoints = 0;
let totalCreditHours = 0;

for (let i = 0; i < inputs.length; i += 2) {
const creditHours = Number(inputs[i].value);
const gradePoints = Number(inputs[i + 1].value);

totalGradePoints += creditHours * gradePoints;
totalCreditHours += creditHours;
}

if (totalCreditHours === 0) {
result.textContent = "Please enter your course information.";
return;
}

const cgpa = totalGradePoints / totalCreditHours;

result.textContent = `Your CGPA is ${cgpa.toFixed(2)}`;
updateAcademicSummary();
});
// ===============================
// Academic Planner
// ===============================

const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function () {

const taskTitle = document.getElementById("taskTitle").value.trim();
const taskSubject = document.getElementById("taskSubject").value.trim();
const taskDate = document.getElementById("taskDate").value;

if (taskTitle === "" || taskSubject === "" || taskDate === "") {
alert("Please fill in all fields.");
return;
}

const task = document.createElement("div");

task.className = "task-item";

task.innerHTML = `
<h3>${taskTitle}</h3>
<p>Subject: ${taskSubject}</p>
<p>Due Date: ${taskDate}</p>
<button class="complete-task">Mark Complete</button>
<button class="delete-task">Delete</button>
`;

taskList.appendChild(task);
updateDashboard();

document.getElementById("taskTitle").value = "";
document.getElementById("taskSubject").value = "";
document.getElementById("taskDate").value = "";

task.querySelector(".complete-task").addEventListener("click", function () {
task.classList.toggle("completed");
updateDashboard();
});

task.querySelector(".delete-task").addEventListener("click", function () {
task.remove();
updateDashboard();
});
});

// ===============================
// Student Documents
// ===============================

const documentInput = document.getElementById("documentInput");
const uploadDocumentButton = document.getElementById("uploadDocument");
const documentList = document.getElementById("documentList");

uploadDocumentButton.addEventListener("click", function () {

const file = documentInput.files[0];

if (!file) {
alert("Please select a document first.");
return;
}

const documentItem = document.createElement("div");

documentItem.className = "document-item";

documentItem.innerHTML = `
<h3>${file.name}</h3>
<p>File type: ${file.type || "Unknown"}</p>
<p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
<button class="open-document">Open</button>
<button class="remove-document">Remove</button>
`;

documentList.appendChild(documentItem);

const fileURL = URL.createObjectURL(file);

documentItem.querySelector(".open-document").addEventListener("click", function () {
window.open(fileURL, "_blank");
});

documentItem.querySelector(".remove-document").addEventListener("click", function () {
URL.revokeObjectURL(fileURL);
documentItem.remove();
});

documentInput.value = "";
});
// ===============================
// Student Notes
// ===============================

const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const addNoteButton = document.getElementById("addNote");
const notesList = document.getElementById("notesList");

addNoteButton.addEventListener("click", function () {

const title = noteTitle.value.trim();
const content = noteContent.value.trim();

if (title === "" || content === "") {
alert("Please enter both a title and note.");
return;
}

const noteItem = document.createElement("div");

noteItem.className = "note-item";

noteItem.innerHTML = `
<h3>${title}</h3>
<p>${content}</p>
<button class="delete-note">Delete</button>
`;

notesList.appendChild(noteItem);
updateDashboard();

noteItem.querySelector(".delete-note").addEventListener("click", function () {
noteItem.remove();
updateDashboard();
});

noteTitle.value = "";
noteContent.value = "";
});
/* ===============================
Student Dashboard
=============================== */

function updateDashboard() {

const tasks = document.querySelectorAll(".task-item");
const completed = document.querySelectorAll(".task-item.completed");
const notes = document.querySelectorAll(".note-item");

const totalTasks = tasks.length;
const completedTasks = completed.length;
const pendingTasks = totalTasks - completedTasks;
const totalNotes = notes.length;

document.getElementById("totalTasks").textContent = totalTasks;
document.getElementById("completedTasks").textContent = completedTasks;
document.getElementById("pendingTasks").textContent = pendingTasks;
document.getElementById("totalNotes").textContent = totalNotes;
}

updateDashboard();
// ===============================
// Academic Summary Connection
// ===============================

function updateAcademicSummary() {

// Find all course rows
const courses = document.querySelectorAll(".course");

let totalCourses = courses.length;
let totalCredits = 0;

courses.forEach(function(course) {

const creditInput = course.querySelector(".credit-hours");

if (creditInput) {
totalCredits += Number(creditInput.value) || 0;
}
});

// Get current CGPA result
const resultText = document.getElementById("result").textContent;

// Show total courses
document.getElementById("summaryCourses").textContent = totalCourses;

// Show total credit hours
document.getElementById("summaryCredits").textContent = totalCredits;

// Show CGPA
document.getElementById("summaryCGPA").textContent =
resultText || "0.00";

// Show status
const status = document.getElementById("summaryStatus");

if (resultText === "" || resultText === "0.00") {
status.textContent = "Not Calculated";
} else {
status.textContent = "Calculated";
}
}

// ===============================
// Academic Summary Connection
// ===============================

// ===============================
// Academic Summary
// ===============================

function updateAcademicSummary() {

// Count course input groups
const courseInputs = document.querySelectorAll(
'input[placeholder*="Course"], input[placeholder*="course"]'
);

const creditInputs = document.querySelectorAll(
'input[placeholder*="Credit"], input[placeholder*="credit"]'
);

// Total courses
document.getElementById("summaryCourses").textContent =
courseInputs.length;

// Total credit hours
let totalCredits = 0;

creditInputs.forEach(function(input) {
totalCredits += Number(input.value) || 0;
});

document.getElementById("summaryCredits").textContent =
totalCredits;

// Get CGPA from result
const result = document.getElementById("result").textContent;

document.getElementById("summaryCGPA").textContent =
result || "0.00";

// Status
if (result && result.trim() !== "") {
document.getElementById("summaryStatus").textContent =
"Calculated";
} else {
document.getElementById("summaryStatus").textContent =
"Not Calculated";
}
}
// ===============================
// Assignments & Presentations
// ===============================

const showAssignmentsButton = document.getElementById("showAssignments");
const showPresentationsButton = document.getElementById("showPresentations");

const assignmentForm = document.getElementById("assignmentForm");
const presentationForm = document.getElementById("presentationForm");

const saveAssignmentButton = document.getElementById("saveAssignment");
const savePresentationButton = document.getElementById("savePresentation");

const workList = document.getElementById("workList");

// Show Assignments
showAssignmentsButton.addEventListener("click", function () {

assignmentForm.style.display = "flex";
presentationForm.style.display = "none";

});

// Show Presentations
showPresentationsButton.addEventListener("click", function () {

assignmentForm.style.display = "none";
presentationForm.style.display = "flex";

});

// Save Assignment
saveAssignmentButton.addEventListener("click", function () {

const title = document.getElementById("assignmentTitle").value.trim();
const subject = document.getElementById("assignmentSubject").value.trim();
const content = document.getElementById("assignmentContent").value.trim();

if (title === "" || subject === "" || content === "") {
alert("Please fill in all assignment fields.");
return;
}

const workItem = document.createElement("div");

workItem.className = "work-item";

workItem.innerHTML = `
<h3>${title}</h3>
<p><strong>Type:</strong> Assignment</p>
<p><strong>Subject:</strong> ${subject}</p>
<p>${content}</p>
<button class="delete-work">Delete</button>
`;

workList.appendChild(workItem);

workItem.querySelector(".delete-work").addEventListener("click", function () {
workItem.remove();
});

document.getElementById("assignmentTitle").value = "";
document.getElementById("assignmentSubject").value = "";
document.getElementById("assignmentContent").value = "";

});

// Save Presentation
savePresentationButton.addEventListener("click", function () {

const title = document.getElementById("presentationTitle").value.trim();
const subject = document.getElementById("presentationSubject").value.trim();
const content = document.getElementById("presentationContent").value.trim();

if (title === "" || subject === "" || content === "") {
alert("Please fill in all presentation fields.");
return;
}

const workItem = document.createElement("div");

workItem.className = "work-item";

workItem.innerHTML = `
<h3>${title}</h3>
<p><strong>Type:</strong> Presentation</p>
<p><strong>Subject:</strong> ${subject}</p>
<p>${content}</p>
<button class="delete-work">Delete</button>
`;

workList.appendChild(workItem);

workItem.querySelector(".delete-work").addEventListener("click", function () {
workItem.remove();
});

document.getElementById("presentationTitle").value = "";
document.getElementById("presentationSubject").value = "";
document.getElementById("presentationContent").value = "";

});


// =========================================
// OFFLINE AI STUDY ASSISTANT
// =========================================


// =========================================
// 1. OFFLINE KNOWLEDGE BASE
// =========================================

const studyKnowledge = {

// -----------------------------------------
// GENERAL
// -----------------------------------------

"critical thinking":
"Critical thinking is the ability to analyze information carefully, evaluate evidence, identify assumptions, and reach a logical conclusion.",

"research":
"Research is a systematic process of collecting, analyzing, and interpreting information to answer a question or solve a problem.",

"hypothesis":
"A hypothesis is a testable explanation or prediction about a situation or relationship between variables.",

"theory":
"A theory is a well-supported explanation of a phenomenon based on evidence and repeated investigation.",

"analysis":
"Analysis means examining information carefully by breaking it into smaller parts to understand it better.",

"communication":
"Communication is the process of sharing information, ideas, thoughts, or feelings between people.",

"presentation":
"A presentation is a structured way of communicating information or ideas to an audience.",


// =========================================
// COMPUTER SCIENCE / IT
// =========================================

"algorithm":
"An algorithm is a step-by-step procedure used to solve a problem or complete a task.",

"data structure":
"A data structure is a way of organizing and storing data so that it can be accessed and modified efficiently.",

"array":
"An array is a data structure that stores multiple values of the same type in an ordered collection.",

"variable":
"A variable is a named storage location used by a program to hold a value that can change during execution.",

"function":
"A function is a reusable block of code designed to perform a specific task.",

"recursion":
"Recursion is a programming technique where a function calls itself to solve smaller versions of the same problem.",

"object oriented programming":
"Object-Oriented Programming, or OOP, is a programming approach based on objects and classes. Its major concepts include encapsulation, inheritance, polymorphism, and abstraction.",

"polymorphism":
"Polymorphism means allowing the same interface or operation to behave differently depending on the object or situation.",

"encapsulation":
"Encapsulation means combining data and methods inside a class and controlling direct access to the internal data.",

"inheritance":
"Inheritance allows one class to acquire properties and methods from another class.",

"abstraction":
"Abstraction means hiding unnecessary implementation details and showing only the important features.",

"compiler":
"A compiler translates source code written in a programming language into machine code or another lower-level form that a computer can execute.",

"python":
"Python is a high-level programming language known for its simple syntax and wide use in web development, automation, data science, AI, and machine learning.",

"c++":
"C++ is a general-purpose programming language that supports procedural, object-oriented, and generic programming.",

"software engineering":
"Software engineering is the systematic approach to designing, developing, testing, deploying, and maintaining software.",

"operating system":
"An operating system is system software that manages computer hardware and provides services for application programs.",

"database":
"A database is an organized collection of data that can be stored, accessed, managed, and updated efficiently.",

"sql":
"SQL stands for Structured Query Language. It is used to create, read, update, and manage data in relational databases.",

"dbms":
"A DBMS, or Database Management System, is software used to create, manage, organize, and access databases.",

"primary key":
"A primary key is a field or combination of fields that uniquely identifies each record in a database table.",

"foreign key":
"A foreign key is a field that connects one database table to another by referencing a primary key.",

"normalization":
"Database normalization is the process of organizing database tables to reduce unnecessary data duplication and improve data consistency.",

"transaction":
"A database transaction is a sequence of operations treated as one logical unit of work.",


// =========================================
// NETWORKING
// =========================================

"computer network":
"A computer network is a group of connected devices that communicate and share data or resources with each other.",

"ip address":
"An IP address is a numerical address assigned to a device on a network so that it can be identified and communicate with other devices.",

"tcp":
"TCP, or Transmission Control Protocol, provides reliable, ordered, and error-checked delivery of data over a network.",

"udp":
"UDP, or User Datagram Protocol, is a connectionless protocol that sends data quickly without guaranteeing delivery.",

"router":
"A router connects different networks and forwards data packets between them.",

"switch":
"A network switch connects devices within a network and forwards data to the appropriate device.",

"dns":
"DNS, or Domain Name System, translates human-readable domain names into IP addresses.",

"http":
"HTTP, or Hypertext Transfer Protocol, is used for communication between web browsers and web servers.",

"cybersecurity":
"Cybersecurity is the practice of protecting computers, networks, systems, applications, and data from unauthorized access and attacks.",

"firewall":
"A firewall is a security system that monitors and controls network traffic according to defined security rules.",


// =========================================
// AI & MACHINE LEARNING
// =========================================

"artificial intelligence":
"Artificial Intelligence, or AI, is the field of computing focused on creating systems that can perform tasks that normally require human intelligence.",

"machine learning":
"Machine learning is a branch of AI in which computers learn patterns from data and use those patterns to make predictions or decisions.",

"deep learning":
"Deep learning is a type of machine learning that uses multi-layer neural networks to learn complex patterns from data.",

"neural network":
"A neural network is a computational model inspired by the structure of the brain. It uses interconnected nodes to learn patterns from data.",

"dataset":
"A dataset is a collection of related data used for analysis, training machine learning models, or testing systems.",

"training data":
"Training data is the data used to teach a machine learning model how to recognize patterns and make predictions.",

"overfitting":
"Overfitting happens when a machine learning model learns the training data too closely and performs poorly on new unseen data.",

"natural language processing":
"Natural Language Processing, or NLP, is a field of AI that focuses on enabling computers to understand and process human language.",

"computer vision":
"Computer vision is an AI field that enables computers to interpret and understand information from images and videos.",


// =========================================
// BUSINESS / BBA
// =========================================

"business":
"Business is an organized activity involving the production, buying, selling, or exchange of goods and services to satisfy needs and usually generate profit.",

"management":
"Management is the process of planning, organizing, leading, and controlling resources to achieve organizational goals.",

"marketing":
"Marketing involves identifying customer needs and promoting, communicating, and delivering products or services to customers.",

"entrepreneurship":
"Entrepreneurship is the process of identifying opportunities and creating, organizing, and managing a business or venture.",

"leadership":
"Leadership is the ability to guide, influence, and motivate people toward achieving shared goals.",

"organization":
"An organization is a structured group of people working together to achieve common objectives.",

"business strategy":
"Business strategy is a long-term plan designed to help an organization achieve its goals and compete effectively.",

"human resource management":
"Human Resource Management, or HRM, involves managing employees, recruitment, training, performance, compensation, and workplace relationships.",

"supply chain":
"A supply chain is the network of people, organizations, resources, and processes involved in producing and delivering a product or service.",

"customer relationship management":
"Customer Relationship Management, or CRM, refers to strategies and technologies used to manage relationships and interactions with customers.",

"market segmentation":
"Market segmentation is the process of dividing a broad market into smaller groups of customers with similar needs or characteristics.",

"swot analysis":
"SWOT analysis examines an organization through four areas: Strengths, Weaknesses, Opportunities, and Threats.",


// =========================================
// ACCOUNTING & FINANCE
// =========================================

"accounting":
"Accounting is the process of recording, classifying, summarizing, and interpreting financial transactions.",

"asset":
"An asset is a resource owned or controlled by a person or organization that has economic value.",

"liability":
"A liability is a financial obligation or debt that an individual or organization owes to another party.",

"equity":
"Equity represents the owner's residual interest in the assets of a business after liabilities are deducted.",

"revenue":
"Revenue is the income a business earns from its normal business activities, such as selling goods or services.",

"profit":
"Profit is the amount remaining after expenses are subtracted from revenue.",

"balance sheet":
"A balance sheet is a financial statement showing a company's assets, liabilities, and equity at a specific point in time.",

"income statement":
"An income statement shows revenue, expenses, and the resulting profit or loss of a business over a specific period.",

"cash flow":
"Cash flow refers to the movement of money entering and leaving a business or organization.",

"investment":
"An investment is the allocation of money or resources with the expectation of receiving a future benefit or return.",


// =========================================
// ECONOMICS
// =========================================

"economics":
"Economics is the study of how individuals, businesses, and governments use limited resources to satisfy needs and wants.",

"supply":
"Supply refers to the quantity of a product or service that producers are willing and able to sell at different prices.",

"demand":
"Demand refers to the quantity of a product or service that consumers are willing and able to buy at different prices.",

"inflation":
"Inflation is a general increase in the prices of goods and services over time, which reduces the purchasing power of money.",

"gdp":
"GDP, or Gross Domestic Product, is the total monetary value of final goods and services produced within a country during a specific period.",

"opportunity cost":
"Opportunity cost is the value of the next best alternative that is given up when a decision is made.",

"monopoly":
"A monopoly is a market structure in which a single seller or company has significant control over the supply of a product or service.",


// =========================================
// MATHEMATICS & STATISTICS
// =========================================

"calculus":
"Calculus is a branch of mathematics concerned with change, rates of change, derivatives, integrals, and accumulation.",

"derivative":
"A derivative measures the rate at which a quantity changes with respect to another quantity. It is commonly used to find slopes and rates of change.",

"integral":
"An integral is a mathematical concept used to calculate accumulation, area under curves, and quantities built from continuous change.",

"linear algebra":
"Linear algebra is a branch of mathematics dealing with vectors, matrices, linear equations, and linear transformations.",

"matrix":
"A matrix is a rectangular arrangement of numbers or values organized into rows and columns.",

"probability":
"Probability is the mathematical measure of how likely an event is to occur.",

"statistics":
"Statistics is the field of mathematics concerned with collecting, organizing, analyzing, interpreting, and presenting data.",

"mean":
"The mean is the average of a set of numbers. It is calculated by adding all values and dividing by the number of values.",

"median":
"The median is the middle value in an ordered dataset. If there are two middle values, their average is used.",

"standard deviation":
"Standard deviation measures how spread out values are from the mean. A larger standard deviation indicates greater variation.",


// =========================================
// PHYSICS
// =========================================

"physics":
"Physics is the branch of science that studies matter, energy, motion, forces, space, and their interactions.",

"force":
"Force is a push or pull that can change the motion or shape of an object. It is measured in newtons.",

"velocity":
"Velocity is the rate of change of displacement with respect to time and includes both speed and direction.",

"acceleration":
"Acceleration is the rate at which velocity changes with time.",

"energy":
"Energy is the capacity to do work or cause change. Common forms include kinetic, potential, thermal, and electrical energy.",

"gravity":
"Gravity is the force of attraction between objects with mass.",

"momentum":
"Momentum is the quantity of motion of an object and is calculated as mass multiplied by velocity.",


// =========================================
// CHEMISTRY
// =========================================

"chemistry":
"Chemistry is the branch of science that studies matter, its properties, composition, structure, and chemical reactions.",

"atom":
"An atom is the basic unit of an element. It contains a nucleus with protons and neutrons surrounded by electrons.",

"molecule":
"A molecule is a group of two or more atoms chemically bonded together.",

"element":
"An element is a pure substance made of atoms that all have the same number of protons.",

"compound":
"A compound is a substance formed when atoms of two or more different elements chemically combine.",

"chemical reaction":
"A chemical reaction is a process in which substances are transformed into new substances with different properties.",

"ph":
"pH is a scale used to describe how acidic or basic a water-based solution is. Values below 7 are acidic, 7 is neutral, and values above 7 are basic.",


// =========================================
// BIOLOGY
// =========================================

"biology":
"Biology is the branch of science that studies living organisms and life processes.",

"cell":
"A cell is the basic structural and functional unit of living organisms.",

"dna":
"DNA, or deoxyribonucleic acid, contains genetic information used for the development, functioning, and reproduction of living organisms.",

"gene":
"A gene is a segment of DNA that contains information contributing to a specific biological characteristic or function.",

"photosynthesis":
"Photosynthesis is the process by which plants and some other organisms use light energy to convert carbon dioxide and water into glucose and oxygen.",

"ecosystem":
"An ecosystem consists of living organisms interacting with each other and with their physical environment.",


// =========================================
// ENGINEERING
// =========================================

"engineering":
"Engineering is the application of mathematics, science, and technical knowledge to design and develop solutions to practical problems.",

"mechanical engineering":
"Mechanical engineering focuses on the design, analysis, manufacturing, and operation of machines and mechanical systems.",

"electrical engineering":
"Electrical engineering focuses on electricity, electronics, electrical systems, circuits, and related technologies.",

"civil engineering":
"Civil engineering deals with the design, construction, and maintenance of infrastructure such as buildings, roads, bridges, and water systems.",

"circuit":
"An electrical circuit is a closed path through which electric current can flow.",

"voltage":
"Voltage is the electrical potential difference between two points. It is measured in volts.",

"current":
"Electric current is the flow of electric charge through a conductor. It is measured in amperes.",

"resistance":
"Electrical resistance is the opposition to the flow of electric current. It is measured in ohms.",


// =========================================
// ENGLISH / HUMANITIES
// =========================================

"grammar":
"Grammar is the set of rules that determines how words and sentences are structured and used in a language.",

"noun":
"A noun is a word used to name a person, place, thing, animal, or idea.",

"verb":
"A verb is a word that expresses an action, occurrence, or state of being.",

"adjective":
"An adjective is a word that describes or modifies a noun or pronoun.",

"essay":
"An essay is a structured piece of writing that presents ideas, arguments, explanations, or analysis about a topic.",

"metaphor":
"A metaphor is a figure of speech that describes one thing by directly comparing it to another thing for expressive effect.",

"literature":
"Literature refers to written or spoken works such as novels, poetry, drama, and other forms of creative or artistic expression."

};


// =========================================
// 2. ELEMENTS
// =========================================

const aiSubject = document.getElementById("aiSubject");

const suggestedQuestions =
document.getElementById("suggestedQuestions");

const aiQuestion =
document.getElementById("aiQuestion");

const askAIButton =
document.getElementById("askAI");

const chatBox =
document.getElementById("chatBox");

const clearChatButton =
document.getElementById("clearChat");


// =========================================
// 3. SUBJECT QUESTIONS
// Exactly 3 for every subject
// =========================================

const subjectQuestions = {

general: [
"What is critical thinking?",
"What is research?",
"What is a hypothesis?"
],

computer: [
"What is OOP?",
"What is an algorithm?",
"What is a database?"
],

ai: [
"What is artificial intelligence?",
"What is machine learning?",
"What is a neural network?"
],

business: [
"What is marketing?",
"What is management?",
"What is SWOT analysis?"
],

accounting: [
"What is accounting?",
"What is an asset?",
"What is a balance sheet?"
],

economics: [
"What is inflation?",
"What is supply and demand?",
"What is opportunity cost?"
],

mathematics: [
"What is calculus?",
"What is probability?",
"What is standard deviation?"
],

science: [
"What is force?",
"What is an atom?",
"What is DNA?"
],

engineering: [
"What is engineering?",
"What is voltage?",
"What is electrical resistance?"
],

english: [
"What is grammar?",
"What is a metaphor?",
"What is an essay?"
]

};


// =========================================
// 4. ALIASES
// Allows different ways of asking
// =========================================

const aliases = {

"oop": "object oriented programming",

"object oriented": "object oriented programming",

"ai": "artificial intelligence",

"ml": "machine learning",

"dl": "deep learning",

"nlp": "natural language processing",

"cv": "computer vision",

"db": "database",

"dbms": "dbms",

"ip": "ip address",

"hr": "human resource management",

"crm": "customer relationship management",

"gdp": "gdp",

"swot": "swot analysis",

"std": "standard deviation"

};


// =========================================
// 5. FIND OFFLINE ANSWER
// =========================================

function findStudyAnswer(question) {

const lowerQuestion =
question.toLowerCase().trim();


// Check aliases first

for (const alias in aliases) {

if (lowerQuestion.includes(alias)) {

const actualTerm = aliases[alias];

if (studyKnowledge[actualTerm]) {

return studyKnowledge[actualTerm];

}

}

}


// Check knowledge base

for (const term in studyKnowledge) {

if (lowerQuestion.includes(term)) {

return studyKnowledge[term];

}

}


// Greetings

if (
lowerQuestion.includes("hello") ||
lowerQuestion.includes("hi") ||
lowerQuestion.includes("hey")
) {

return "Hello! 👋 I'm your Offline Study Assistant. Ask me about your subjects, concepts, definitions, or academic topics.";

}


// Thanks

if (
lowerQuestion.includes("thank")
) {

return "You're welcome! 📚 Keep studying and good luck!";

}


// Unknown question

return "I don't have an offline answer for that yet. Try asking me about a specific academic term, concept, or subject.";

}


// =========================================
// 6. SHOW THE 3 SUGGESTED QUESTIONS
// =========================================

function showSuggestedQuestions() {

const subject =
aiSubject.value;

suggestedQuestions.innerHTML = "";


const questions =
subjectQuestions[subject];


questions.forEach(function(question) {

const button =
document.createElement("button");


button.className =
"suggested-question";


button.type =
"button";


button.textContent =
question;


button.addEventListener(
"click",
function() {

aiQuestion.value =
question;

askOfflineAI();

}
);


suggestedQuestions.appendChild(button);

});

}


// =========================================
// 7. CHANGE SUBJECT
// =========================================

aiSubject.addEventListener(
"change",
showSuggestedQuestions
);


// =========================================
// 8. ADD CHAT MESSAGE
// =========================================

function addChatMessage(
text,
className,
name
) {

const message =
document.createElement("div");


message.className =
"chat-message " + className;


const strong =
document.createElement("strong");


strong.textContent =
name + ":";


const paragraph =
document.createElement("p");


paragraph.textContent =
text;


message.appendChild(strong);

message.appendChild(paragraph);


chatBox.appendChild(message);


chatBox.scrollTop =
chatBox.scrollHeight;

}


// =========================================
// 9. ASK OFFLINE AI
// =========================================

function askOfflineAI() {

const question =
aiQuestion.value.trim();


if (question === "") {

return;

}


// Show user's question

addChatMessage(
question,
"user-message",
"You"
);


// Find offline answer

const answer =
findStudyAnswer(question);


// Show assistant answer

addChatMessage(
answer,
"assistant-message",
"Study Assistant"
);


// Clear input

aiQuestion.value = "";


// Put cursor back in input

aiQuestion.focus();

}


// =========================================
// 10. ASK BUTTON
// =========================================

askAIButton.addEventListener(
"click",
askOfflineAI
);


// =========================================
// 11. PRESS ENTER TO ASK
// =========================================

aiQuestion.addEventListener(
"keydown",
function(event) {

if (event.key === "Enter") {

event.preventDefault();

askOfflineAI();

}

}
);


// =========================================
// 12. CLEAR CHAT
// =========================================

clearChatButton.addEventListener(
"click",
function() {

chatBox.innerHTML = "";


addChatMessage(
"Chat cleared. Ask me another study question whenever you're ready! 📚",
"assistant-message",
"Study Assistant"
);

}
);


// =========================================
// 13. LOAD 3 QUESTIONS WHEN PAGE OPENS
// =========================================

showSuggestedQuestions();

// =========================================
// Storage & File Space
// =========================================


// =========================================
// 1. Storage Settings
// =========================================

// Free storage = 1 GB
const FREE_STORAGE_MB = 1024;

// Extra storage = 6 GB
const EXTRA_STORAGE_MB = 6144;


// =========================================
// 2. Get Storage Elements
// =========================================

const storageUsed =
document.getElementById("storageUsed");

const storageTotal =
document.getElementById("storageTotal");

const storageAvailable =
document.getElementById("storageAvailable");

const storagePercentage =
document.getElementById("storagePercentage");

const storageProgressBar =
document.getElementById("storageProgressBar");

const upgradeStorageButton =
document.getElementById("upgradeStorage");

const upgradeMessage =
document.getElementById("upgradeMessage");

const storagePlan =
document.getElementById("storagePlan");


// =========================================
// 3. Get Current Storage Plan
// =========================================

let extraStorageEnabled =
localStorage.getItem("extraStorageEnabled") === "true";


// =========================================
// 4. Get Total Storage
// =========================================

function getTotalStorage() {

if (extraStorageEnabled) {

return FREE_STORAGE_MB + EXTRA_STORAGE_MB;

}

return FREE_STORAGE_MB;

}


// =========================================
// 5. Format Storage
// =========================================

function formatStorage(mb) {

if (mb >= 1024) {

const gb =
mb / 1024;

if (gb % 1 === 0) {

return gb + " GB";

}

return gb.toFixed(2) + " GB";

}

return mb.toFixed(2) + " MB";

}


// =========================================
// 6. Get Used Storage
// =========================================

// For now the frontend starts with 0 MB used.
// Later this will connect to real uploaded files.

function getUsedStorage() {

const savedUsage =
localStorage.getItem("storageUsedMB");

if (savedUsage === null) {

return 0;

}

return Number(savedUsage);

}


// =========================================
// 7. Update Storage Dashboard
// =========================================

function updateStorage() {

const used =
getUsedStorage();

const total =
getTotalStorage();

let available =
total - used;


if (available < 0) {

available = 0;

}


let percentage =
(used / total) * 100;


if (percentage > 100) {

percentage = 100;

}


storageUsed.textContent =
formatStorage(used);

storageTotal.textContent =
formatStorage(total);

storageAvailable.textContent =
formatStorage(available);

storagePercentage.textContent =
Math.round(percentage) + "%";

storageProgressBar.style.width =
percentage + "%";


// Update plan name

if (extraStorageEnabled) {

storagePlan.textContent =
"Premium — 7 GB";

} else {

storagePlan.textContent =
"Free — 1 GB";

}

}


// =========================================
// 8. Upgrade Storage
// =========================================

upgradeStorageButton.addEventListener(
"click",
function() {

if (extraStorageEnabled) {

upgradeMessage.textContent =
"You already have the extra 6 GB storage activated. ✅";

return;

}


const confirmUpgrade =
confirm(
"Activate the extra 6 GB storage for Rs 1,000?"
);


if (!confirmUpgrade) {

return;

}


// Save upgrade in browser

extraStorageEnabled = true;

localStorage.setItem(
"extraStorageEnabled",
"true"
);


upgradeMessage.textContent =
"Extra 6 GB storage activated successfully! 🎉";


upgradeStorageButton.textContent =
"6 GB Extra Storage Activated";


updateStorage();

}
);


// =========================================
// 9. Restore Upgrade Button State
// =========================================

if (extraStorageEnabled) {

upgradeStorageButton.textContent =
"6 GB Extra Storage Activated";

}


// =========================================
// 10. Load Storage
// =========================================

updateStorage();


// =========================================
// HANGMAN GAME
// =========================================


// =========================================
// 1. GAME WORDS
// =========================================

const hangmanWords = {

programming: [
"python",
"javascript",
"algorithm",
"variable",
"function",
"database",
"compiler",
"recursion",
"software",
"programming"
],

computer: [
"network",
"computer",
"internet",
"keyboard",
"processor",
"operating",
"security",
"firewall",
"database",
"hardware"
],

business: [
"marketing",
"business",
"management",
"leadership",
"strategy",
"customer",
"entrepreneur",
"investment",
"organization",
"finance"
],

science: [
"physics",
"chemistry",
"biology",
"gravity",
"energy",
"molecule",
"element",
"ecosystem",
"velocity",
"acceleration"
],

general: [
"education",
"university",
"student",
"knowledge",
"learning",
"research",
"communication",
"technology",
"development",
"success"
]

};


// =========================================
// 2. GAME VARIABLES
// =========================================

let currentWord = "";

let guessedLetters = [];

let attemptsLeft = 6;

let score = 0;

let wins = 0;

let gameOver = false;


// =========================================
// 3. GET HTML ELEMENTS
// =========================================

const hangmanWord =
document.getElementById("hangmanWord");

const hangmanAttempts =
document.getElementById("hangmanAttempts");

const hangmanScore =
document.getElementById("hangmanScore");

const hangmanWins =
document.getElementById("hangmanWins");

const hangmanLetter =
document.getElementById("hangmanLetter");

const guessLetterButton =
document.getElementById("guessLetter");

const newHangmanGameButton =
document.getElementById("newHangmanGame");

const hangmanMessage =
document.getElementById("hangmanMessage");

const usedLetters =
document.getElementById("usedLetters");

const hangmanCategory =
document.getElementById("hangmanCategory");


// =========================================
// 4. CHOOSE RANDOM WORD
// =========================================

function chooseHangmanWord() {

const category =
hangmanCategory.value;

const words =
hangmanWords[category];

const randomIndex =
Math.floor(
Math.random() * words.length
);

return words[randomIndex];

}


// =========================================
// 5. START NEW GAME
// =========================================

function startHangmanGame() {

currentWord =
chooseHangmanWord();

guessedLetters = [];

attemptsLeft = 6;

gameOver = false;

hangmanLetter.value = "";

hangmanMessage.textContent =
"Guess a letter to start!";

updateHangmanDisplay();

hangmanLetter.focus();

}


// =========================================
// 6. DISPLAY WORD
// =========================================

function updateHangmanDisplay() {

let displayedWord = "";


for (
let i = 0;
i < currentWord.length;
i++
) {

const letter =
currentWord[i];


if (
guessedLetters.includes(letter)
) {

displayedWord +=
letter.toUpperCase() + " ";

} else {

displayedWord += "_ ";

}

}


hangmanWord.textContent =
displayedWord.trim();


hangmanAttempts.textContent =
attemptsLeft;


hangmanScore.textContent =
score;


hangmanWins.textContent =
wins;


if (guessedLetters.length === 0) {

usedLetters.textContent =
"None";

} else {

usedLetters.textContent =
guessedLetters
.map(function(letter) {
return letter.toUpperCase();
})
.join(", ");

}

}


// =========================================
// 7. CHECK IF WORD IS COMPLETE
// =========================================

function checkHangmanWin() {

for (
let i = 0;
i < currentWord.length;
i++
) {

if (
!guessedLetters.includes(
currentWord[i]
)
) {

return false;

}

}

return true;

}


// =========================================
// 8. GUESS LETTER
// =========================================

function guessHangmanLetter() {

if (gameOver) {

return;

}


let letter =
hangmanLetter.value
.toLowerCase()
.trim();


// Make sure exactly one letter is entered

if (
letter === "" ||
!/^[a-z]$/.test(letter)
) {

hangmanMessage.textContent =
"Please enter one letter only.";

hangmanLetter.value = "";

hangmanLetter.focus();

return;

}


// Check whether letter was already used

if (
guessedLetters.includes(letter)
) {

hangmanMessage.textContent =
"You already guessed that letter.";

hangmanLetter.value = "";

hangmanLetter.focus();

return;

}


// Add letter to used letters

guessedLetters.push(letter);


// Correct guess

if (
currentWord.includes(letter)
) {

score += 10;

hangmanMessage.textContent =
"Correct! 🎉";

}

// Wrong guess

else {

attemptsLeft--;

hangmanMessage.textContent =
"Wrong guess. Try another letter.";

}


updateHangmanDisplay();


// Check win

if (checkHangmanWin()) {

wins++;

score += 50;

gameOver = true;

hangmanMessage.textContent =
"🎉 You won! The word was " +
currentWord.toUpperCase() +
".";

updateHangmanDisplay();

return;

}


// Check loss

if (attemptsLeft <= 0) {

gameOver = true;

hangmanMessage.textContent =
"Game over! The word was " +
currentWord.toUpperCase() +
".";

updateHangmanDisplay();

return;

}


// Clear input

hangmanLetter.value = "";

hangmanLetter.focus();

}


// =========================================
// 9. GUESS BUTTON
// =========================================

guessLetterButton.addEventListener(
"click",
guessHangmanLetter
);


// =========================================
// 10. ENTER KEY
// =========================================

hangmanLetter.addEventListener(
"keydown",
function(event) {

if (event.key === "Enter") {

event.preventDefault();

guessHangmanLetter();

}

}
);


// =========================================
// 11. NEW GAME BUTTON
// =========================================

newHangmanGameButton.addEventListener(
"click",
startHangmanGame
);


// =========================================
// 12. CHANGE CATEGORY
// =========================================

hangmanCategory.addEventListener(
"change",
startHangmanGame
);


// =========================================
// 13. START FIRST GAME
// =========================================

startHangmanGame();

// =========================================
// Study Progress & Performance
// =========================================


// =========================================
// 1. Get Elements
// =========================================

const progressSubject =
document.getElementById("progressSubject");

const progressMarks =
document.getElementById("progressMarks");

const addProgressButton =
document.getElementById("addProgress");

const progressList =
document.getElementById("progressList");

const progressSubjectCount =
document.getElementById("progressSubjectCount");

const progressAverage =
document.getElementById("progressAverage");

const progressStatus =
document.getElementById("progressStatus");


// =========================================
// 2. Add Subject
// =========================================

addProgressButton.addEventListener(
"click",
function() {

const subject =
progressSubject.value.trim();

const marks =
Number(progressMarks.value);


// Validation

if (
subject === "" ||
progressMarks.value === ""
) {

alert(
"Please enter the subject name and marks."
);

return;

}


if (
marks < 0 ||
marks > 100
) {

alert(
"Marks must be between 0 and 100."
);

return;

}


// Create subject item

const progressItem =
document.createElement("div");

progressItem.className =
"progress-item";


progressItem.innerHTML = `

<div class="progress-item-header">

<h3>${subject}</h3>

<span>${marks}%</span>

</div>


<div class="progress-bar-background">

<div
class="progress-bar-fill"
style="width: ${marks}%"
></div>

</div>


<button class="delete-progress">
Delete
</button>

`;


progressList.appendChild(
progressItem
);


// Delete subject

progressItem
.querySelector(".delete-progress")
.addEventListener(
"click",
function() {

progressItem.remove();

updateProgressSummary();

}
);


// Clear inputs

progressSubject.value = "";

progressMarks.value = "";


// Update summary

updateProgressSummary();

}
);


// =========================================
// 3. Calculate Overall Performance
// =========================================

function updateProgressSummary() {

const progressItems =
document.querySelectorAll(
".progress-item"
);


const count =
progressItems.length;


let totalMarks = 0;


progressItems.forEach(
function(item) {

const marksText =
item.querySelector(
".progress-item-header span"
).textContent;


const marks =
Number(
marksText.replace("%", "")
);


totalMarks += marks;

}
);


// No subjects

if (count === 0) {

progressSubjectCount.textContent =
"0";

progressAverage.textContent =
"0%";

progressStatus.textContent =
"No Data";

return;

}


// Calculate average

const average =
totalMarks / count;


progressSubjectCount.textContent =
count;


progressAverage.textContent =
average.toFixed(1) + "%";


// Determine status

if (average >= 80) {

progressStatus.textContent =
"Excellent";

}

else if (average >= 70) {

progressStatus.textContent =
"Good";

}

else if (average >= 50) {

progressStatus.textContent =
"Average";

}

else {

progressStatus.textContent =
"Needs Improvement";

}

}

/* ============================= */
/* Exam & Class Schedule */
/* ============================= */

const scheduleSubject =
document.getElementById("scheduleSubject");

const scheduleType =
document.getElementById("scheduleType");

const scheduleDate =
document.getElementById("scheduleDate");

const scheduleTime =
document.getElementById("scheduleTime");

const addScheduleButton =
document.getElementById("addSchedule");

const scheduleList =
document.getElementById("scheduleList");


addScheduleButton.addEventListener(
"click",
function() {

const subject =
scheduleSubject.value.trim();

const type =
scheduleType.value;

const date =
scheduleDate.value;

const time =
scheduleTime.value;


if (
subject === "" ||
date === "" ||
time === ""
) {

alert(
"Please fill in the subject, date, and time."
);

return;
}


const scheduleItem =
document.createElement("div");

scheduleItem.className =
"schedule-item";


scheduleItem.dataset.dateTime =
date + "T" + time;


scheduleItem.innerHTML = `

<div class="schedule-item-header">

<h3>${subject}</h3>

<span class="schedule-type">
${type}
</span>

</div>

<div class="schedule-details">

<p>
<strong>Date:</strong>
${date}
</p>

<p>
<strong>Time:</strong>
${time}
</p>

</div>

<button class="delete-schedule">
Delete
</button>

`;


scheduleList.appendChild(
scheduleItem
);


scheduleItem
.querySelector(".delete-schedule")
.addEventListener(
"click",
function() {

scheduleItem.remove();

}
);


scheduleSubject.value = "";
scheduleDate.value = "";
scheduleTime.value = "";


sortScheduleItems();

}
);


/* Sort schedule by date and time */

function sortScheduleItems() {

const items =
Array.from(
scheduleList.querySelectorAll(
".schedule-item"
)
);


items.sort(
function(a, b) {

return (
a.dataset.dateTime.localeCompare(
b.dataset.dateTime
)
);

}
);


items.forEach(
function(item) {

scheduleList.appendChild(item);

}
);

}

/* ============================= */
/* Assignment & Exam Reminders */
/* ============================= */

const reminderTitle =
document.getElementById("reminderTitle");

const reminderType =
document.getElementById("reminderType");

const reminderDate =
document.getElementById("reminderDate");

const reminderTime =
document.getElementById("reminderTime");

const addReminderButton =
document.getElementById("addReminder");

const reminderList =
document.getElementById("reminderList");


addReminderButton.addEventListener(
"click",
function() {

const title =
reminderTitle.value.trim();

const type =
reminderType.value;

const date =
reminderDate.value;

const time =
reminderTime.value;


if (
title === "" ||
date === "" ||
time === ""
) {

alert(
"Please enter the title, date, and time."
);

return;
}


const reminderItem =
document.createElement("div");

reminderItem.className =
"reminder-item";


reminderItem.dataset.dateTime =
date + "T" + time;


reminderItem.innerHTML = `

<div class="reminder-item-header">

<h3>${title}</h3>

<span class="reminder-type">
${type}
</span>

</div>

<div class="reminder-details">

<p>
<strong>Date:</strong>
${date}
</p>

<p>
<strong>Time:</strong>
${time}
</p>

</div>

<button class="complete-reminder">
Mark Complete
</button>

<button class="delete-reminder">
Delete
</button>

`;


reminderList.appendChild(
reminderItem
);


reminderItem
.querySelector(".complete-reminder")
.addEventListener(
"click",
function() {

reminderItem.classList.toggle(
"completed"
);

}
);


reminderItem
.querySelector(".delete-reminder")
.addEventListener(
"click",
function() {

reminderItem.remove();

}
);


reminderTitle.value = "";
reminderDate.value = "";
reminderTime.value = "";


sortReminders();

}
);


/* Sort reminders by date and time */

function sortReminders() {

const items =
Array.from(
reminderList.querySelectorAll(
".reminder-item"
)
);


items.sort(
function(a, b) {

return (
a.dataset.dateTime.localeCompare(
b.dataset.dateTime
)
);

}
);


items.forEach(
function(item) {

reminderList.appendChild(item);

}
);

}


/* ============================= */
/* Study Resources Library */
/* ============================= */

const resourceTitle =
    document.getElementById("resourceTitle");

const resourceSubject =
    document.getElementById("resourceSubject");

const resourceType =
    document.getElementById("resourceType");

const resourceLink =
    document.getElementById("resourceLink");

const addResourceButton =
    document.getElementById("addResource");

const resourceList =
    document.getElementById("resourceList");


addResourceButton.addEventListener(
    "click",
    function() {

        const title =
            resourceTitle.value.trim();

        const subject =
            resourceSubject.value.trim();

        const type =
            resourceType.value;

        const link =
            resourceLink.value.trim();


        if (
            title === "" ||
            subject === "" ||
            link === ""
        ) {

            alert(
                "Please enter the title, subject, and resource link."
            );

            return;
        }


        try {

            new URL(link);

        } catch (error) {

            alert(
                "Please enter a valid website link."
            );

            return;
        }


        const resourceItem =
            document.createElement("div");

        resourceItem.className =
            "resource-item";


        resourceItem.innerHTML = `

            <h3>${title}</h3>

            <span class="resource-type">
                ${type}
            </span>

            <p>
                <strong>Subject:</strong>
                ${subject}
            </p>

            <div class="resource-actions">

                <a
                    href="${link}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open Resource
                </a>

                <button class="delete-resource">
                    Delete
                </button>

            </div>

        `;


        resourceList.appendChild(
            resourceItem
        );


        resourceItem
            .querySelector(".delete-resource")
            .addEventListener(
                "click",
                function() {

                    resourceItem.remove();

                }
            );


        resourceTitle.value = "";
        resourceSubject.value = "";
        resourceLink.value = "";

    }
);

/* ============================= */
/* Daily Study Goals */
/* ============================= */

const dailyGoal =
    document.getElementById("dailyGoal");

const setGoalButton =
    document.getElementById("setGoal");

const goalMinutes =
    document.getElementById("goalMinutes");

const studiedMinutes =
    document.getElementById("studiedMinutes");

const remainingMinutes =
    document.getElementById("remainingMinutes");

const goalPercentage =
    document.getElementById("goalPercentage");

const goalProgressText =
    document.getElementById("goalProgressText");

const goalProgressBar =
    document.getElementById("goalProgressBar");

const sessionSubject =
    document.getElementById("sessionSubject");

const sessionMinutes =
    document.getElementById("sessionMinutes");

const addStudySessionButton =
    document.getElementById("addStudySession");

const studySessionList =
    document.getElementById("studySessionList");


let currentStudyGoal = 0;
let totalStudiedMinutes = 0;


setGoalButton.addEventListener(
    "click",
    function() {

        const goal =
            Number(dailyGoal.value);


        if (goal <= 0) {

            alert(
                "Please enter a study goal greater than 0."
            );

            return;
        }


        currentStudyGoal = goal;

        updateStudyGoal();


        dailyGoal.value = "";

    }
);


addStudySessionButton.addEventListener(
    "click",
    function() {

        const subject =
            sessionSubject.value.trim();

        const minutes =
            Number(sessionMinutes.value);


        if (
            subject === "" ||
            minutes <= 0
        ) {

            alert(
                "Please enter the subject and study time."
            );

            return;
        }


        const sessionItem =
            document.createElement("div");

        sessionItem.className =
            "study-session-item";


        sessionItem.innerHTML = `

            <h3>${subject}</h3>

            <p>
                <strong>Study Time:</strong>
                ${minutes} minutes
            </p>

            <button class="complete-session">
                Mark Complete
            </button>

            <button class="delete-session">
                Delete
            </button>

        `;


        studySessionList.appendChild(
            sessionItem
        );


        sessionItem
            .querySelector(".complete-session")
            .addEventListener(
                "click",
                function() {

                    if (
                        sessionItem.classList.contains(
                            "completed"
                        )
                    ) {

                        sessionItem.classList.remove(
                            "completed"
                        );

                        totalStudiedMinutes -= minutes;

                    } else {

                        sessionItem.classList.add(
                            "completed"
                        );

                        totalStudiedMinutes += minutes;

                    }

                    updateStudyGoal();

                }
            );


        sessionItem
            .querySelector(".delete-session")
            .addEventListener(
                "click",
                function() {

                    if (
                        sessionItem.classList.contains(
                            "completed"
                        )
                    ) {

                        totalStudiedMinutes -= minutes;

                    }

                    sessionItem.remove();

                    updateStudyGoal();

                }
            );


        sessionSubject.value = "";
        sessionMinutes.value = "";

    }
);


function updateStudyGoal() {

    goalMinutes.textContent =
        currentStudyGoal + " min";


    studiedMinutes.textContent =
        totalStudiedMinutes + " min";


    let remaining =
        currentStudyGoal -
        totalStudiedMinutes;


    if (remaining < 0) {
        remaining = 0;
    }


    remainingMinutes.textContent =
        remaining + " min";


    let percentage = 0;


    if (currentStudyGoal > 0) {

        percentage =
            (
                totalStudiedMinutes /
                currentStudyGoal
            ) * 100;

    }


    if (percentage > 100) {
        percentage = 100;
    }


    const roundedPercentage =
        Math.round(percentage);


    goalPercentage.textContent =
        roundedPercentage + "%";


    goalProgressText.textContent =
        roundedPercentage + "%";


    goalProgressBar.style.width =
        percentage + "%";

}

/* =====================================
STUDENT PROFILE & SETTINGS
===================================== */

// Get profile elements
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const degreeProgram = document.getElementById("degreeProgram");
const semester = document.getElementById("semester");
const universityName = document.getElementById("universityName");

const studyTarget = document.getElementById("studyTarget");

const notificationToggle =
document.getElementById("notificationToggle");

const darkModeToggle =
document.getElementById("darkModeToggle");

const saveProfileBtn =
document.getElementById("saveProfileBtn");

const resetProfileBtn =
document.getElementById("resetProfileBtn");

const profileMessage =
document.getElementById("profileMessage");

const avatarInitial =
document.getElementById("avatarInitial");

const profileStorageBar =
document.getElementById("profileStorageBar");

const storageText =
document.getElementById("storageText");


/* =====================================
LOAD PROFILE
===================================== */

function loadStudentProfile() {

const savedProfile =
JSON.parse(localStorage.getItem("studentProfile"));

if (!savedProfile) {
return;
}

studentName.value =
savedProfile.name || "";

studentId.value =
savedProfile.studentId || "";

degreeProgram.value =
savedProfile.degree || "";

semester.value =
savedProfile.semester || "";

universityName.value =
savedProfile.university || "";

studyTarget.value =
savedProfile.studyTarget || 120;

notificationToggle.checked =
savedProfile.notifications !== false;

darkModeToggle.checked =
savedProfile.darkMode === true;

updateProfileAvatar();

updateStorageDisplay();

applyDarkMode();
}


/* =====================================
SAVE PROFILE
===================================== */

function saveStudentProfile() {

const profile = {

name: studentName.value.trim(),

studentId: studentId.value.trim(),

degree: degreeProgram.value.trim(),

semester: semester.value,

university: universityName.value.trim(),

studyTarget:
Number(studyTarget.value) || 120,

notifications:
notificationToggle.checked,

darkMode:
darkModeToggle.checked
};


localStorage.setItem(
"studentProfile",
JSON.stringify(profile)
);


updateProfileAvatar();

updateStorageDisplay();

applyDarkMode();


profileMessage.textContent =
"Profile saved successfully.";

setTimeout(function () {

profileMessage.textContent = "";

}, 2500);
}


/* =====================================
PROFILE AVATAR
===================================== */

function updateProfileAvatar() {

const name =
studentName.value.trim();

if (name.length > 0) {

avatarInitial.textContent =
name.charAt(0).toUpperCase();

} else {

avatarInitial.textContent = "S";
}
}


/* =====================================
DARK MODE
===================================== */

function applyDarkMode() {

if (darkModeToggle.checked) {

document.body.classList.add("dark-mode");

} else {

document.body.classList.remove("dark-mode");
}
}


/* =====================================
STORAGE DISPLAY
===================================== */

function updateStorageDisplay() {

const savedProfile =
localStorage.getItem("studentProfile");

if (!savedProfile) {

profileStorageBar.style.width = "0%";

storageText.textContent =
"No profile data stored yet.";

return;
}


const dataSize =
new Blob([savedProfile]).size;


const percentage =
Math.min(
Math.max(dataSize / 5000 * 100, 5),
100
);


profileStorageBar.style.width =
percentage + "%";


storageText.textContent =
"Profile data stored locally (" +
dataSize +
" bytes)";
}


/* =====================================
RESET PROFILE
===================================== */

function resetStudentProfile() {

const confirmReset =
confirm(
"Are you sure you want to reset your profile data?"
);


if (!confirmReset) {
return;
}


localStorage.removeItem("studentProfile");


studentName.value = "";
studentId.value = "";
degreeProgram.value = "";
semester.value = "";
universityName.value = "";

studyTarget.value = 120;

notificationToggle.checked = true;

darkModeToggle.checked = false;


updateProfileAvatar();

applyDarkMode();

updateStorageDisplay();


profileMessage.textContent =
"Profile data has been reset.";

setTimeout(function () {

profileMessage.textContent = "";

}, 2500);
}


/* =====================================
EVENT LISTENERS
===================================== */

saveProfileBtn.addEventListener(
"click",
saveStudentProfile
);


resetProfileBtn.addEventListener(
"click",
resetStudentProfile
);


darkModeToggle.addEventListener(
"change",
applyDarkMode
);


studentName.addEventListener(
"input",
updateProfileAvatar
);


/* =====================================
START PROFILE SYSTEM
===================================== */

loadStudentProfile();

/* =========================================
SUBJECT & COURSE MANAGER
========================================= */

const addCourseBtn =
document.getElementById("addCourseBtn");

const emptyAddCourseBtn =
document.getElementById("emptyAddCourseBtn");

const courseModal =
document.getElementById("courseModal");

const closeCourseModal =
document.getElementById("closeCourseModal");

const cancelCourseBtn =
document.getElementById("cancelCourseBtn");

const courseForm =
document.getElementById("courseForm");

const courseModalTitle =
document.getElementById("courseModalTitle");

const courseName =
document.getElementById("courseName");

const courseCode =
document.getElementById("courseCode");

const creditHours =
document.getElementById("creditHours");

const instructorName =
document.getElementById("instructorName");

const classTiming =
document.getElementById("classTiming");

const classRoom =
document.getElementById("classRoom");

const courseStatus =
document.getElementById("courseStatus");

const courseList =
document.getElementById("courseList");

const courseSearch =
document.getElementById("courseSearch");

const courseFilter =
document.getElementById("courseFilter");

const totalCourses =
document.getElementById("totalCourses");

const currentCourses =
document.getElementById("currentCourses");

const completedCourses =
document.getElementById("completedCourses");

const totalCredits =
document.getElementById("totalCredits");


let courses =
JSON.parse(
localStorage.getItem("studentCourses")
) || [];


let editingCourseId = null;


/* =========================================
OPEN MODAL
========================================= */

function openCourseModal(course = null) {

courseModal.classList.add("active");

if (course) {

editingCourseId = course.id;

courseModalTitle.textContent =
"Edit Course";

courseName.value =
course.name;

courseCode.value =
course.code;

creditHours.value =
course.credits;

instructorName.value =
course.instructor;

classTiming.value =
course.timing;

classRoom.value =
course.room;

courseStatus.value =
course.status;

} else {

editingCourseId = null;

courseModalTitle.textContent =
"Add New Course";

courseForm.reset();

courseStatus.value =
"current";
}
}


/* =========================================
CLOSE MODAL
========================================= */

function closeCourseModalWindow() {

courseModal.classList.remove("active");

editingCourseId = null;

courseForm.reset();

courseModalTitle.textContent =
"Add New Course";
}


/* =========================================
SAVE COURSE
========================================= */

function saveCourse(event) {

event.preventDefault();


const newCourse = {

id:
editingCourseId ||
Date.now(),

name:
courseName.value.trim(),

code:
courseCode.value.trim(),

credits:
Number(creditHours.value),

instructor:
instructorName.value.trim(),

timing:
classTiming.value.trim(),

room:
classRoom.value.trim(),

status:
courseStatus.value
};


if (editingCourseId) {

courses =
courses.map(function(course) {

if (course.id === editingCourseId) {
return newCourse;
}

return course;
});

} else {

courses.push(newCourse);
}


saveCourses();

closeCourseModalWindow();

renderCourses();
}


/* =========================================
SAVE TO LOCAL STORAGE
========================================= */

function saveCourses() {

localStorage.setItem(
"studentCourses",
JSON.stringify(courses)
);
}


/* =========================================
RENDER COURSES
========================================= */

function renderCourses() {

const searchText =
courseSearch.value
.trim()
.toLowerCase();

const filterValue =
courseFilter.value;


const filteredCourses =
courses.filter(function(course) {

const matchesSearch =
course.name
.toLowerCase()
.includes(searchText) ||

course.code
.toLowerCase()
.includes(searchText) ||

course.instructor
.toLowerCase()
.includes(searchText);


const matchesFilter =
filterValue === "all" ||
course.status === filterValue;


return matchesSearch &&
matchesFilter;
});


courseList.innerHTML = "";


if (filteredCourses.length === 0) {

courseList.innerHTML = `

<div class="empty-courses">

<div class="empty-course-icon">
📚
</div>

<h3>
${
courses.length === 0
? "No Courses Added Yet"
: "No Matching Courses"
}
</h3>

<p>
${
courses.length === 0
? "Add your first subject to start managing your courses."
: "Try changing your search or filter."
}
</p>

${
courses.length === 0
? `
<button
class="add-course-btn"
onclick="openCourseModal()"
>
+ Add Your First Course
</button>
`
: ""
}

</div>
`;

updateCourseStats();

return;
}


filteredCourses.forEach(function(course) {

const card =
document.createElement("div");

card.className =
"course-card";


card.innerHTML = `

<div class="course-card-top">

<div class="course-title-area">

<h3>
${escapeCourseHTML(course.name)}
</h3>

<span class="course-code">
${escapeCourseHTML(course.code)}
</span>

</div>

<span class="
course-status
${course.status}
">
${
course.status === "current"
? "CURRENT"
: "COMPLETED"
}
</span>

</div>


<div class="course-details">

<div class="course-detail-item">

<span>Credit Hours</span>

<strong>
${course.credits}
</strong>

</div>


<div class="course-detail-item">

<span>Instructor</span>

<strong>
${
escapeCourseHTML(
course.instructor || "Not set"
)
}
</strong>

</div>


<div class="course-detail-item">

<span>Class Timing</span>

<strong>
${
escapeCourseHTML(
course.timing || "Not set"
)
}
</strong>

</div>


<div class="course-detail-item">

<span>Room</span>

<strong>
${
escapeCourseHTML(
course.room || "Not set"
)
}
</strong>

</div>

</div>


<div class="course-actions">

<button
class="course-action-btn edit-course-btn"
onclick="editCourse(${course.id})"
>
Edit
</button>

<button
class="course-action-btn delete-course-btn"
onclick="deleteCourse(${course.id})"
>
Delete
</button>

</div>
`;


courseList.appendChild(card);

});


updateCourseStats();
}


/* =========================================
COURSE STATISTICS
========================================= */

function updateCourseStats() {

const current =
courses.filter(function(course) {

return course.status === "current";

}).length;


const completed =
courses.filter(function(course) {

return course.status === "completed";

}).length;


const credits =
courses.reduce(
function(total, course) {

return total +
Number(course.credits || 0);

},
0
);


totalCourses.textContent =
courses.length;

currentCourses.textContent =
current;

completedCourses.textContent =
completed;

totalCredits.textContent =
credits;
}


/* =========================================
EDIT COURSE
========================================= */

function editCourse(id) {

const course =
courses.find(function(course) {

return course.id === id;

});


if (!course) {
return;
}


openCourseModal(course);
}


/* =========================================
DELETE COURSE
========================================= */

function deleteCourse(id) {

const confirmed =
confirm(
"Are you sure you want to delete this course?"
);


if (!confirmed) {
return;
}


courses =
courses.filter(function(course) {

return course.id !== id;

});


saveCourses();

renderCourses();
}


/* =========================================
SECURITY HELPER
========================================= */

function escapeCourseHTML(value) {

return String(value)
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}


/* =========================================
EVENT LISTENERS
========================================= */

addCourseBtn.addEventListener(
"click",
function() {
openCourseModal();
}
);


emptyAddCourseBtn.addEventListener(
"click",
function() {
openCourseModal();
}
);


closeCourseModal.addEventListener(
"click",
closeCourseModalWindow
);


cancelCourseBtn.addEventListener(
"click",
closeCourseModalWindow
);


courseForm.addEventListener(
"submit",
saveCourse
);


courseSearch.addEventListener(
"input",
renderCourses
);


courseFilter.addEventListener(
"change",
renderCourses
);


/* Close modal by clicking outside */

courseModal.addEventListener(
"click",
function(event) {

if (event.target === courseModal) {

closeCourseModalWindow();

}

}
);


/* =========================================
START COURSE MANAGER
========================================= */

renderCourses();

/* =========================================
ASSIGNMENT & DEADLINE BOARD
========================================= */

const addDeadlineBtn =
document.getElementById("addDeadlineBtn");

const emptyDeadlineAddBtn =
document.getElementById("emptyDeadlineAddBtn");

const deadlineModal =
document.getElementById("deadlineModal");

const closeDeadlineModal =
document.getElementById("closeDeadlineModal");

const cancelDeadlineBtn =
document.getElementById("cancelDeadlineBtn");

const deadlineForm =
document.getElementById("deadlineForm");

const deadlineModalTitle =
document.getElementById("deadlineModalTitle");

const deadlineTitle =
document.getElementById("deadlineTitle");

const deadlineSubject =
document.getElementById("deadlineSubject");

const deadlineDate =
document.getElementById("deadlineDate");

const deadlineTime =
document.getElementById("deadlineTime");

const deadlinePriority =
document.getElementById("deadlinePriority");

const deadlineStatus =
document.getElementById("deadlineStatus");

const deadlineDescription =
document.getElementById("deadlineDescription");

const deadlineSearch =
document.getElementById("deadlineSearch");

const deadlineStatusFilter =
document.getElementById("deadlineStatusFilter");

const deadlinePriorityFilter =
document.getElementById("deadlinePriorityFilter");

const deadlineSort =
document.getElementById("deadlineSort");

const deadlineTaskList =
document.getElementById("deadlineTaskList");

const deadlineEmptyState =
document.getElementById("deadlineEmptyState");


/* ================================
SUMMARY ELEMENTS
================================ */

const totalDeadlineTasks =
document.getElementById("totalDeadlineTasks");

const pendingDeadlineTasks =
document.getElementById("pendingDeadlineTasks");

const progressDeadlineTasks =
document.getElementById("progressDeadlineTasks");

const completedDeadlineTasks =
document.getElementById("completedDeadlineTasks");

const overdueDeadlineTasks =
document.getElementById("overdueDeadlineTasks");


/* ================================
DATA
================================ */

let deadlineTasks =
JSON.parse(
localStorage.getItem(
"studentDeadlineTasks"
)
) || [];


let editingDeadlineId = null;


/* ================================
OPEN MODAL
================================ */

function openDeadlineModal(task = null) {

deadlineModal.classList.add("active");


if (task) {

editingDeadlineId =
task.id;

deadlineModalTitle.textContent =
"Edit Assignment";

deadlineTitle.value =
task.title;

deadlineSubject.value =
task.subject;

deadlineDate.value =
task.date;

deadlineTime.value =
task.time;

deadlinePriority.value =
task.priority;

deadlineStatus.value =
task.status;

deadlineDescription.value =
task.description || "";

} else {

editingDeadlineId = null;

deadlineModalTitle.textContent =
"Add Assignment";

deadlineForm.reset();

deadlinePriority.value =
"medium";

deadlineStatus.value =
"pending";

deadlineTime.value =
"23:59";
}
}


/* ================================
CLOSE MODAL
================================ */

function closeDeadlineModalWindow() {

deadlineModal.classList.remove("active");

editingDeadlineId = null;

deadlineForm.reset();

deadlineModalTitle.textContent =
"Add Assignment";
}


/* ================================
SAVE TASK
================================ */

function saveDeadlineTask(event) {

event.preventDefault();


const task = {

id:
editingDeadlineId ||
Date.now(),

title:
deadlineTitle.value.trim(),

subject:
deadlineSubject.value.trim(),

date:
deadlineDate.value,

time:
deadlineTime.value || "23:59",

priority:
deadlinePriority.value,

status:
deadlineStatus.value,

description:
deadlineDescription.value.trim()
};


if (editingDeadlineId) {

deadlineTasks =
deadlineTasks.map(function(item) {

if (
item.id ===
editingDeadlineId
) {
return task;
}

return item;
});

} else {

deadlineTasks.push(task);
}


saveDeadlineTasks();

closeDeadlineModalWindow();

renderDeadlineTasks();
}


/* ================================
SAVE LOCAL STORAGE
================================ */

function saveDeadlineTasks() {

localStorage.setItem(
"studentDeadlineTasks",
JSON.stringify(deadlineTasks)
);
}


/* ================================
CHECK OVERDUE
================================ */

function isDeadlineOverdue(task) {

if (task.status === "completed") {
return false;
}


if (!task.date) {
return false;
}


const dueDateTime =
new Date(
task.date +
"T" +
(task.time || "23:59")
);


return dueDateTime < new Date();
}


/* ================================
FORMAT DATE
================================ */

function formatDeadlineDate(dateString) {

if (!dateString) {
return "Not set";
}


const date =
new Date(
dateString + "T00:00:00"
);


return date.toLocaleDateString(
undefined,
{
day: "numeric",
month: "short",
year: "numeric"
}
);
}


/* ================================
PRIORITY VALUE
================================ */

function priorityValue(priority) {

if (priority === "high") {
return 3;
}

if (priority === "medium") {
return 2;
}

return 1;
}


/* ================================
RENDER TASKS
================================ */

function renderDeadlineTasks() {

const searchText =
deadlineSearch.value
.trim()
.toLowerCase();


const statusFilter =
deadlineStatusFilter.value;


const priorityFilter =
deadlinePriorityFilter.value;


const sortValue =
deadlineSort.value;


let filteredTasks =
deadlineTasks.filter(
function(task) {

const matchesSearch =
task.title
.toLowerCase()
.includes(searchText) ||

task.subject
.toLowerCase()
.includes(searchText);


const matchesStatus =
statusFilter === "all" ||
task.status === statusFilter;


const matchesPriority =
priorityFilter === "all" ||
task.priority === priorityFilter;


return (
matchesSearch &&
matchesStatus &&
matchesPriority
);
}
);


/* ================================
SORT
================================= */

filteredTasks.sort(
function(a, b) {

if (sortValue === "nearest") {

return getDeadlineTime(a)
- getDeadlineTime(b);
}


if (sortValue === "latest") {

return getDeadlineTime(b)
- getDeadlineTime(a);
}


if (sortValue === "priority") {

return priorityValue(b.priority)
- priorityValue(a.priority);
}


if (sortValue === "alphabetical") {

return a.title.localeCompare(
b.title
);
}


return 0;
}
);


deadlineTaskList.innerHTML = "";


/* EMPTY */

if (filteredTasks.length === 0) {

deadlineTaskList.style.display =
"none";

deadlineEmptyState.style.display =
"block";

if (deadlineTasks.length > 0) {

deadlineEmptyState.innerHTML = `

<div class="deadline-empty-icon">
🔎
</div>

<h3>
No Matching Assignments
</h3>

<p>
Try changing your search
or filters.
</p>
`;
}

updateDeadlineSummary();

return;
}


deadlineTaskList.style.display =
"grid";

deadlineEmptyState.style.display =
"none";


filteredTasks.forEach(
function(task) {

const overdue =
isDeadlineOverdue(task);


const card =
document.createElement("div");


card.className =
"deadline-task-card";


if (overdue) {
card.classList.add(
"is-overdue"
);
}


let overdueBadge = "";


if (overdue) {

overdueBadge = `
<span class="
deadline-badge
deadline-overdue-badge
">
OVERDUE
</span>
`;
}


card.innerHTML = `

<div class="deadline-task-top">

<div>

<h3 class="deadline-task-title">
${escapeDeadlineHTML(task.title)}
</h3>

<span class="deadline-task-subject">
${escapeDeadlineHTML(task.subject)}
</span>

</div>


<div class="deadline-badges">

<span class="
deadline-badge
priority-${task.priority}
">
${getPriorityLabel(task.priority)}
</span>


<span class="
deadline-badge
status-${task.status}
">
${getStatusLabel(task.status)}
</span>

${overdueBadge}

</div>

</div>


<div class="deadline-task-info">

<div class="deadline-info-item">

<span>Due Date</span>

<strong>
${formatDeadlineDate(task.date)}
</strong>

</div>


<div class="deadline-info-item">

<span>Due Time</span>

<strong>
${escapeDeadlineHTML(task.time || "Not set")}
</strong>

</div>


<div class="deadline-info-item">

<span>Deadline Status</span>

<strong>
${
overdue
? "Past Due"
: getDeadlineText(task)
}
</strong>

</div>

</div>


${
task.description
? `
<div class="deadline-task-description">
${escapeDeadlineHTML(task.description)}
</div>
`
: ""
}


<div class="deadline-task-actions">

<button
class="
deadline-action-btn
deadline-edit-btn
"
onclick="editDeadlineTask(${task.id})"
>
Edit
</button>


<button
class="
deadline-action-btn
deadline-delete-btn
"
onclick="deleteDeadlineTask(${task.id})"
>
Delete
</button>

</div>
`;


deadlineTaskList.appendChild(card);

}
);


updateDeadlineSummary();
}


/* ================================
DEADLINE TIME
================================ */

function getDeadlineTime(task) {

if (!task.date) {
return Infinity;
}


return new Date(
task.date +
"T" +
(task.time || "23:59")
).getTime();
}


/* ================================
DEADLINE TEXT
================================ */

function getDeadlineText(task) {

const dueTime =
getDeadlineTime(task);


if (dueTime === Infinity) {
return "No date";
}


const difference =
dueTime - Date.now();


const day =
24 * 60 * 60 * 1000;


if (difference < day) {

return "Due today";
}


const days =
Math.ceil(
difference / day
);


return days + " day" +
(days === 1 ? "" : "s") +
" remaining";
}


/* ================================
LABELS
================================ */

function getPriorityLabel(priority) {

if (priority === "high") {
return "HIGH";
}

if (priority === "medium") {
return "MEDIUM";
}

return "LOW";
}


function getStatusLabel(status) {

if (status === "pending") {
return "PENDING";
}

if (status === "progress") {
return "IN PROGRESS";
}

return "COMPLETED";
}


/* ================================
SUMMARY
================================ */

function updateDeadlineSummary() {

const total =
deadlineTasks.length;


const pending =
deadlineTasks.filter(
function(task) {

return task.status === "pending";

}
).length;


const progress =
deadlineTasks.filter(
function(task) {

return task.status === "progress";

}
).length;


const completed =
deadlineTasks.filter(
function(task) {

return task.status === "completed";

}
).length;


const overdue =
deadlineTasks.filter(
function(task) {

return isDeadlineOverdue(task);

}
).length;


totalDeadlineTasks.textContent =
total;

pendingDeadlineTasks.textContent =
pending;

progressDeadlineTasks.textContent =
progress;

completedDeadlineTasks.textContent =
completed;

overdueDeadlineTasks.textContent =
overdue;
}


/* ================================
EDIT
================================ */

function editDeadlineTask(id) {

const task =
deadlineTasks.find(
function(item) {

return item.id === id;

}
);


if (!task) {
return;
}


openDeadlineModal(task);
}


/* ================================
DELETE
================================ */

function deleteDeadlineTask(id) {

const confirmed =
confirm(
"Are you sure you want to delete this assignment?"
);


if (!confirmed) {
return;
}


deadlineTasks =
deadlineTasks.filter(
function(task) {

return task.id !== id;

}
);


saveDeadlineTasks();

renderDeadlineTasks();
}


/* ================================
SECURITY HELPER
================================ */

function escapeDeadlineHTML(value) {

return String(value)
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}


/* ================================
EVENT LISTENERS
================================ */

addDeadlineBtn.addEventListener(
"click",
function() {

openDeadlineModal();

}
);


emptyDeadlineAddBtn.addEventListener(
"click",
function() {

openDeadlineModal();

}
);


closeDeadlineModal.addEventListener(
"click",
closeDeadlineModalWindow
);


cancelDeadlineBtn.addEventListener(
"click",
closeDeadlineModalWindow
);


deadlineForm.addEventListener(
"submit",
saveDeadlineTask
);


deadlineSearch.addEventListener(
"input",
renderDeadlineTasks
);


deadlineStatusFilter.addEventListener(
"change",
renderDeadlineTasks
);


deadlinePriorityFilter.addEventListener(
"change",
renderDeadlineTasks
);


deadlineSort.addEventListener(
"change",
renderDeadlineTasks
);


/* Close modal by clicking outside */

deadlineModal.addEventListener(
"click",
function(event) {

if (
event.target ===
deadlineModal
) {

closeDeadlineModalWindow();

}

}
);


/* ================================
START
================================ */

renderDeadlineTasks();

/* =========================================
ATTENDANCE TRACKER
========================================= */

const addAttendanceBtn =
document.getElementById("addAttendanceBtn");

const emptyAttendanceAddBtn =
document.getElementById("emptyAttendanceAddBtn");

const attendanceModal =
document.getElementById("attendanceModal");

const closeAttendanceModal =
document.getElementById("closeAttendanceModal");

const cancelAttendanceBtn =
document.getElementById("cancelAttendanceBtn");

const attendanceForm =
document.getElementById("attendanceForm");

const attendanceModalTitle =
document.getElementById("attendanceModalTitle");

const attendanceSubject =
document.getElementById("attendanceSubject");

const classesAttended =
document.getElementById("classesAttended");

const classesMissed =
document.getElementById("classesMissed");

const attendanceTarget =
document.getElementById("attendanceTarget");

const attendanceSearch =
document.getElementById("attendanceSearch");

const attendanceFilter =
document.getElementById("attendanceFilter");

const attendanceSort =
document.getElementById("attendanceSort");

const attendanceList =
document.getElementById("attendanceList");

const attendanceEmptyState =
document.getElementById("attendanceEmptyState");


/* ================================
SUMMARY ELEMENTS
================================ */

const attendanceTotalSubjects =
document.getElementById(
"attendanceTotalSubjects"
);

const attendanceOverallPercentage =
document.getElementById(
"attendanceOverallPercentage"
);

const attendanceSafeSubjects =
document.getElementById(
"attendanceSafeSubjects"
);

const attendanceWarningSubjects =
document.getElementById(
"attendanceWarningSubjects"
);

const attendanceCriticalSubjects =
document.getElementById(
"attendanceCriticalSubjects"
);


/* ================================
DATA
================================ */

let attendanceRecords =
JSON.parse(
localStorage.getItem(
"studentAttendanceRecords"
)
) || [];


let editingAttendanceId = null;


/* ================================
OPEN MODAL
================================ */

function openAttendanceModal(record = null) {

attendanceModal.classList.add(
"active"
);


if (record) {

editingAttendanceId =
record.id;

attendanceModalTitle.textContent =
"Edit Subject";

attendanceSubject.value =
record.subject;

classesAttended.value =
record.attended;

classesMissed.value =
record.missed;

attendanceTarget.value =
record.target;

} else {

editingAttendanceId = null;

attendanceModalTitle.textContent =
"Add Subject";

attendanceForm.reset();

classesAttended.value = 0;

classesMissed.value = 0;

attendanceTarget.value = 75;
}
}


/* ================================
CLOSE MODAL
================================ */

function closeAttendanceModalWindow() {

attendanceModal.classList.remove(
"active"
);

editingAttendanceId = null;

attendanceForm.reset();

attendanceModalTitle.textContent =
"Add Subject";
}


/* ================================
SAVE RECORD
================================ */

function saveAttendanceRecord(event) {

event.preventDefault();


const attended =
Math.max(
0,
parseInt(
classesAttended.value
) || 0
);


const missed =
Math.max(
0,
parseInt(
classesMissed.value
) || 0
);


const target =
Math.min(
100,
Math.max(
1,
parseInt(
attendanceTarget.value
) || 75
)
);


const record = {

id:
editingAttendanceId ||
Date.now(),

subject:
attendanceSubject.value.trim(),

attended:
attended,

missed:
missed,

target:
target
};


if (editingAttendanceId) {

attendanceRecords =
attendanceRecords.map(
function(item) {

if (
item.id ===
editingAttendanceId
) {
return record;
}

return item;
}
);

} else {

attendanceRecords.push(record);
}


saveAttendanceRecords();

closeAttendanceModalWindow();

renderAttendance();
}


/* ================================
SAVE LOCAL STORAGE
================================ */

function saveAttendanceRecords() {

localStorage.setItem(
"studentAttendanceRecords",
JSON.stringify(
attendanceRecords
)
);
}


/* ================================
CALCULATE PERCENTAGE
================================ */

function getAttendancePercentage(record) {

const total =
Number(record.attended) +
Number(record.missed);


if (total === 0) {
return 0;
}


return (
Number(record.attended) /
total
) * 100;
}


/* ================================
GET STATUS
================================ */

function getAttendanceStatus(record) {

const percentage =
getAttendancePercentage(
record
);


const target =
Number(record.target) || 75;


if (percentage >= target) {
return "safe";
}


if (
percentage >=
Math.max(0, target - 10)
) {
return "warning";
}


return "critical";
}


/* ================================
STATUS LABEL
================================ */

function getAttendanceStatusLabel(
status
) {

if (status === "safe") {
return "SAFE";
}

if (status === "warning") {
return "WARNING";
}

return "CRITICAL";
}


/* ================================
STATUS MESSAGE
================================ */

function getAttendanceMessage(record) {

const percentage =
getAttendancePercentage(
record
);


const target =
Number(record.target) || 75;


const total =
Number(record.attended) +
Number(record.missed);


/* No classes yet */

if (total === 0) {

return {
type: "warning",

text:
"No classes have been recorded yet."
};
}


/* Already safe */

if (percentage >= target) {

const missedBeforeDrop =
Math.floor(
(
Number(record.attended) * 100
/ target
)
) -
total;


return {
type: "safe",

text:
"Your attendance is currently above your minimum target of " +
target +
"%."
};
}


/* Need classes */

const needed =
classesNeededToReachTarget(
record
);


if (needed > 0) {

return {
type:
percentage >=
Math.max(0, target - 10)
? "warning"
: "critical",

text:
"You need to attend the next " +
needed +
" class" +
(needed === 1 ? "" : "es") +
" consecutively to reach " +
target +
"%."
};
}


return {
type: "critical",

text:
"Your attendance is below the required target."
};
}


/* ================================
CLASSES NEEDED
================================ */

function classesNeededToReachTarget(
record
) {

const attended =
Number(record.attended);

const missed =
Number(record.missed);

const target =
Number(record.target) / 100;


if (target <= 0) {
return 0;
}


if (
attended /
(attended + missed)
>= target
) {
return 0;
}


/*
Solve:

(attended + x)
---------------- >= target
(attended + missed + x)

x = required classes
*/

const required =
Math.ceil(
(
target *
(attended + missed)
- attended
) /
(1 - target)
);


return Math.max(
0,
required
);
}


/* ================================
CLASSES CAN MISS
================================ */

function classesCanMiss(record) {

const attended =
Number(record.attended);

const missed =
Number(record.missed);

const target =
Number(record.target) / 100;


if (
attended /
Math.max(
1,
attended + missed
) < target
) {
return 0;
}


const maxMissed =
Math.floor(
attended / target
);


return Math.max(
0,
maxMissed -
(attended + missed)
);
}


/* ================================
RENDER
================================ */

function renderAttendance() {

const searchText =
attendanceSearch.value
.trim()
.toLowerCase();


const filterValue =
attendanceFilter.value;


const sortValue =
attendanceSort.value;


let filteredRecords =
attendanceRecords.filter(
function(record) {

const status =
getAttendanceStatus(
record
);


const matchesSearch =
record.subject
.toLowerCase()
.includes(
searchText
);


const matchesFilter =
filterValue === "all" ||
status === filterValue;


return (
matchesSearch &&
matchesFilter
);
}
);


/* ================================
SORT
================================= */

filteredRecords.sort(
function(a, b) {

if (
sortValue ===
"lowest"
) {

return (
getAttendancePercentage(a) -
getAttendancePercentage(b)
);
}


if (
sortValue ===
"highest"
) {

return (
getAttendancePercentage(b) -
getAttendancePercentage(a)
);
}


if (
sortValue ===
"alphabetical"
) {

return a.subject.localeCompare(
b.subject
);
}


if (
sortValue ===
"classes"
) {

const totalA =
Number(a.attended) +
Number(a.missed);

const totalB =
Number(b.attended) +
Number(b.missed);

return totalB - totalA;
}


return 0;
}
);


attendanceList.innerHTML = "";


/* ================================
EMPTY
================================= */

if (
filteredRecords.length === 0
) {

attendanceList.style.display =
"none";

attendanceEmptyState.style.display =
"block";


if (
attendanceRecords.length > 0
) {

attendanceEmptyState.innerHTML = `

<div class="attendance-empty-icon">
🔎
</div>

<h3>
No Matching Subjects
</h3>

<p>
Try changing your search
or attendance filter.
</p>

`;
}


updateAttendanceSummary();

return;
}


attendanceList.style.display =
"grid";

attendanceEmptyState.style.display =
"none";


/* ================================
CARDS
================================= */

filteredRecords.forEach(
function(record) {

const percentage =
getAttendancePercentage(
record
);


const status =
getAttendanceStatus(
record
);


const statusLabel =
getAttendanceStatusLabel(
status
);


const message =
getAttendanceMessage(
record
);


const total =
Number(record.attended) +
Number(record.missed);


const canMiss =
classesCanMiss(
record
);


const card =
document.createElement(
"div"
);


card.className =
"attendance-card";


card.innerHTML = `

<div class="attendance-card-top">

<div>

<h3 class="
attendance-subject-title
">
${escapeAttendanceHTML(
record.subject
)}
</h3>

<span class="
attendance-total-classes
">
${total} total class${
total === 1
? ""
: "es"
}
</span>

</div>


<span class="
attendance-status
attendance-status-${status}
">
${statusLabel}
</span>

</div>


<div class="
attendance-progress-area
">

<div class="
attendance-progress-header
">

<span class="
attendance-percentage
">
${percentage.toFixed(1)}%
</span>

<span class="
attendance-target
">
Target: ${record.target}%
</span>

</div>


<div class="
attendance-progress-bar
">

<div
class="
attendance-progress-fill
attendance-fill-${status}
"
style="
width:
${Math.min(
100,
percentage
)}%;
"
></div>

</div>

</div>


<div class="attendance-details">

<div class="
attendance-detail-item
">

<span>
Attended
</span>

<strong>
${record.attended}
</strong>

</div>


<div class="
attendance-detail-item
">

<span>
Missed
</span>

<strong>
${record.missed}
</strong>

</div>


<div class="
attendance-detail-item
">

<span>
${
status === "safe"
? "Can Miss"
: "Need To Attend"
}
</span>

<strong>
${
status === "safe"
? canMiss
: classesNeededToReachTarget(
record
)
}
</strong>

</div>

</div>


<div class="
attendance-message
attendance-message-${message.type}
">
${message.text}
</div>


<div class="
attendance-quick-actions
">

<button
class="
attendance-quick-btn
attendance-present-btn
"
onclick="
markAttendancePresent(
${record.id}
)
"
>
+ Present
</button>


<button
class="
attendance-quick-btn
attendance-absent-btn
"
onclick="
markAttendanceAbsent(
${record.id}
)
"
>
+ Absent
</button>


<button
class="
attendance-quick-btn
attendance-edit-btn
"
onclick="
editAttendance(
${record.id}
)
"
>
Edit
</button>


<button
class="
attendance-quick-btn
attendance-delete-btn
"
onclick="
deleteAttendance(
${record.id}
)
"
>
Delete
</button>

</div>

`;


attendanceList.appendChild(
card
);

}
);


updateAttendanceSummary();
}


/* ================================
PRESENT
================================ */

function markAttendancePresent(id) {

const record =
attendanceRecords.find(
function(item) {

return item.id === id;

}
);


if (!record) {
return;
}


record.attended =
Number(record.attended) + 1;


saveAttendanceRecords();

renderAttendance();
}


/* ================================
ABSENT
================================ */

function markAttendanceAbsent(id) {

const record =
attendanceRecords.find(
function(item) {

return item.id === id;

}
);


if (!record) {
return;
}


record.missed =
Number(record.missed) + 1;


saveAttendanceRecords();

renderAttendance();
}


/* ================================
EDIT
================================ */

function editAttendance(id) {

const record =
attendanceRecords.find(
function(item) {

return item.id === id;

}
);


if (!record) {
return;
}


openAttendanceModal(
record
);
}


/* ================================
DELETE
================================ */

function deleteAttendance(id) {

const confirmed =
confirm(
"Are you sure you want to delete this subject's attendance record?"
);


if (!confirmed) {
return;
}


attendanceRecords =
attendanceRecords.filter(
function(record) {

return record.id !== id;

}
);


saveAttendanceRecords();

renderAttendance();
}


/* ================================
SUMMARY
================================ */

function updateAttendanceSummary() {

const totalSubjects =
attendanceRecords.length;


let totalAttended = 0;

let totalClasses = 0;


attendanceRecords.forEach(
function(record) {

totalAttended +=
Number(record.attended);

totalClasses +=
Number(record.attended) +
Number(record.missed);

}
);


const overallPercentage =
totalClasses === 0
? 0
: (
totalAttended /
totalClasses
) * 100;


const safe =
attendanceRecords.filter(
function(record) {

return (
getAttendanceStatus(
record
) === "safe"
);

}
).length;


const warning =
attendanceRecords.filter(
function(record) {

return (
getAttendanceStatus(
record
) === "warning"
);

}
).length;


const critical =
attendanceRecords.filter(
function(record) {

return (
getAttendanceStatus(
record
) === "critical"
);

}
).length;


attendanceTotalSubjects.textContent =
totalSubjects;


attendanceOverallPercentage.textContent =
overallPercentage.toFixed(1) + "%";


attendanceSafeSubjects.textContent =
safe;


attendanceWarningSubjects.textContent =
warning;


attendanceCriticalSubjects.textContent =
critical;
}


/* ================================
ESCAPE HTML
================================ */

function escapeAttendanceHTML(value) {

return String(value)

.replace(
/&/g,
"&amp;"
)

.replace(
/</g,
"&lt;"
)

.replace(
/>/g,
"&gt;"
)

.replace(
/"/g,
"&quot;"
)

.replace(
/'/g,
"&#039;"
);
}


/* ================================
EVENT LISTENERS
================================ */

addAttendanceBtn.addEventListener(
"click",
function() {

openAttendanceModal();

}
);


emptyAttendanceAddBtn.addEventListener(
"click",
function() {

openAttendanceModal();

}
);


closeAttendanceModal.addEventListener(
"click",
closeAttendanceModalWindow
);


cancelAttendanceBtn.addEventListener(
"click",
closeAttendanceModalWindow
);


attendanceForm.addEventListener(
"submit",
saveAttendanceRecord
);


attendanceSearch.addEventListener(
"input",
renderAttendance
);


attendanceFilter.addEventListener(
"change",
renderAttendance
);


attendanceSort.addEventListener(
"change",
renderAttendance
);


/* Close modal by clicking outside */

attendanceModal.addEventListener(
"click",
function(event) {

if (
event.target ===
attendanceModal
) {

closeAttendanceModalWindow();

}

}
);


/* ================================
INITIAL RENDER
================================ */

renderAttendance();

/* ==================== RESOURCE ORGANIZER ==================== */

let organizedResources =
JSON.parse(localStorage.getItem("organizedStudyResources")) || [];

let editingOrganizedResourceId = null;


/* ---------- SAVE DATA ---------- */

function saveOrganizedResources() {
localStorage.setItem(
"organizedStudyResources",
JSON.stringify(organizedResources)
);
}


/* ---------- OPEN MODAL ---------- */

function openOrganizerResourceModal(resource = null) {

const modal = document.getElementById("organizerResourceModal");
const form = document.getElementById("organizerResourceForm");
const title = document.getElementById("organizerModalTitle");

if (resource) {

editingOrganizedResourceId = resource.id;

title.textContent = "Edit Resource";

document.getElementById("organizerResourceTitle").value =
resource.title;

document.getElementById("organizerResourceSubject").value =
resource.subject;

document.getElementById("organizerResourceCategory").value =
resource.category;

document.getElementById("organizerResourceType").value =
resource.type;

document.getElementById("organizerResourceTags").value =
resource.tags.join(", ");

document.getElementById("organizerResourceLocation").value =
resource.location;

document.getElementById("organizerResourceDescription").value =
resource.description;

} else {

editingOrganizedResourceId = null;

title.textContent = "Add Resource";

form.reset();

document.getElementById("organizerResourceCategory").value =
"Lecture Notes";

document.getElementById("organizerResourceType").value =
"PDF";
}

modal.classList.add("active");
}


/* ---------- CLOSE MODAL ---------- */

function closeOrganizerResourceModal() {

document
.getElementById("organizerResourceModal")
.classList.remove("active");

document
.getElementById("organizerResourceForm")
.reset();

editingOrganizedResourceId = null;
}


/* ---------- SAVE RESOURCE ---------- */

function saveOrganizedResource(event) {

event.preventDefault();

const title =
document.getElementById("organizerResourceTitle").value.trim();

const subject =
document.getElementById("organizerResourceSubject").value.trim();

const category =
document.getElementById("organizerResourceCategory").value;

const type =
document.getElementById("organizerResourceType").value;

const tagsInput =
document.getElementById("organizerResourceTags").value.trim();

const location =
document.getElementById("organizerResourceLocation").value.trim();

const description =
document.getElementById("organizerResourceDescription").value.trim();

const tags = tagsInput
? tagsInput
.split(",")
.map(tag => tag.trim())
.filter(tag => tag !== "")
: [];


/* EDIT */

if (editingOrganizedResourceId) {

const resourceIndex = organizedResources.findIndex(
resource => resource.id === editingOrganizedResourceId
);

if (resourceIndex !== -1) {

organizedResources[resourceIndex].title = title;
organizedResources[resourceIndex].subject = subject;
organizedResources[resourceIndex].category = category;
organizedResources[resourceIndex].type = type;
organizedResources[resourceIndex].tags = tags;
organizedResources[resourceIndex].location = location;
organizedResources[resourceIndex].description = description;

}

}

/* ADD */

else {

const newResource = {

id: Date.now(),

title: title,

subject: subject,

category: category,

type: type,

tags: tags,

location: location,

description: description,

favorite: false,

pinned: false,

createdAt: new Date().toISOString(),

lastOpened: null
};

organizedResources.unshift(newResource);
}


saveOrganizedResources();

closeOrganizerResourceModal();

renderOrganizedResources();
}


/* ---------- FILTER RESOURCES ---------- */

function getFilteredOrganizedResources() {

const search =
document
.getElementById("organizerResourceSearch")
.value
.toLowerCase()
.trim();

const category =
document.getElementById("organizerCategoryFilter").value;

const type =
document.getElementById("organizerTypeFilter").value;

const special =
document.getElementById("organizerSpecialFilter").value;


return organizedResources.filter(resource => {

const searchableText = [

resource.title,

resource.subject,

resource.category,

resource.type,

resource.description,

...(resource.tags || [])

]
.join(" ")
.toLowerCase();


const matchesSearch =
!search || searchableText.includes(search);

const matchesCategory =
category === "all" ||
resource.category === category;

const matchesType =
type === "all" ||
resource.type === type;

const matchesSpecial =
special === "all" ||
(special === "favorite" && resource.favorite) ||
(special === "pinned" && resource.pinned);


return (
matchesSearch &&
matchesCategory &&
matchesType &&
matchesSpecial
);
});
}


/* ---------- RENDER RESOURCES ---------- */

function renderOrganizedResources() {

const list =
document.getElementById("organizedResourceList");

const emptyState =
document.getElementById("organizerEmptyState");

const filteredResources =
getFilteredOrganizedResources();


if (organizedResources.length === 0) {

list.innerHTML = "";

emptyState.style.display = "block";

updateOrganizerStats();

return;
}


emptyState.style.display = "none";


if (filteredResources.length === 0) {

list.innerHTML = `
<div class="organizer-empty-state">
<div class="organizer-empty-icon">🔎</div>
<h3>No Matching Resources</h3>
<p>Try changing your search or filters.</p>
</div>
`;

updateOrganizerStats();

return;
}


list.innerHTML = filteredResources
.map(resource => {

const tagsHTML = (resource.tags || [])
.map(tag => `
<span class="organizer-tag">
#${escapeOrganizerHTML(tag)}
</span>
`)
.join("");


const createdDate =
new Date(resource.createdAt)
.toLocaleDateString();


return `

<div class="organized-resource-card">

<div class="organized-resource-top">

<div>

<h3 class="organized-resource-title">
${escapeOrganizerHTML(resource.title)}
</h3>

<p class="organized-resource-subject">
${escapeOrganizerHTML(resource.subject)}
</p>

</div>


<div class="organized-resource-icons">

<button
class="organizer-icon-btn ${resource.pinned ? "active" : ""}"
onclick="toggleOrganizerPinned(${resource.id})"
title="Pin"
>
📌
</button>

<button
class="organizer-icon-btn ${resource.favorite ? "active" : ""}"
onclick="toggleOrganizerFavorite(${resource.id})"
title="Favorite"
>
${resource.favorite ? "★" : "☆"}
</button>

</div>

</div>


<div class="organized-resource-meta">

<span class="organizer-badge">
${escapeOrganizerHTML(resource.category)}
</span>

<span class="organizer-badge">
${escapeOrganizerHTML(resource.type)}
</span>

${
resource.pinned
? `<span class="organizer-badge">Pinned</span>`
: ""
}

</div>


${
resource.description
? `
<p class="organized-resource-description">
${escapeOrganizerHTML(resource.description)}
</p>
`
: ""
}


${
tagsHTML
? `
<div class="organized-resource-tags">
${tagsHTML}
</div>
`
: ""
}


<div class="organized-resource-footer">

<span class="organized-resource-date">
Added ${createdDate}
</span>


<div class="organized-resource-actions">

${
resource.location
? `
<button
class="organizer-action-btn"
onclick="openOrganizedResource(${resource.id})"
>
Open
</button>
`
: ""
}

<button
class="organizer-action-btn"
onclick="editOrganizedResource(${resource.id})"
>
Edit
</button>

<button
class="organizer-action-btn delete"
onclick="deleteOrganizedResource(${resource.id})"
>
Delete
</button>

</div>

</div>

</div>
`;
})
.join("");


updateOrganizerStats();
}


/* ---------- FAVORITE ---------- */

function toggleOrganizerFavorite(id) {

const resource =
organizedResources.find(item => item.id === id);

if (!resource) return;

resource.favorite = !resource.favorite;

saveOrganizedResources();

renderOrganizedResources();
}


/* ---------- PIN ---------- */

function toggleOrganizerPinned(id) {

const resource =
organizedResources.find(item => item.id === id);

if (!resource) return;

resource.pinned = !resource.pinned;

saveOrganizedResources();

renderOrganizedResources();
}


/* ---------- OPEN RESOURCE ---------- */

function openOrganizedResource(id) {

const resource =
organizedResources.find(item => item.id === id);

if (!resource) return;


resource.lastOpened = new Date().toISOString();

saveOrganizedResources();


if (!resource.location) {

alert("No file path or link has been added for this resource.");

return;
}


if (
resource.location.startsWith("http://") ||
resource.location.startsWith("https://")
) {

window.open(
resource.location,
"_blank"
);

} else {

alert(
"Resource location saved:\n\n" +
resource.location
);
}
}


/* ---------- EDIT ---------- */

function editOrganizedResource(id) {

const resource =
organizedResources.find(item => item.id === id);

if (!resource) return;

openOrganizerResourceModal(resource);
}


/* ---------- DELETE ---------- */

function deleteOrganizedResource(id) {

const resource =
organizedResources.find(item => item.id === id);

if (!resource) return;


const confirmed =
confirm(
`Delete "${resource.title}"?`
);


if (!confirmed) return;


organizedResources =
organizedResources.filter(
item => item.id !== id
);


saveOrganizedResources();

renderOrganizedResources();
}


/* ---------- STATISTICS ---------- */

function updateOrganizerStats() {

const total =
organizedResources.length;

const favorites =
organizedResources.filter(
resource => resource.favorite
).length;

const pinned =
organizedResources.filter(
resource => resource.pinned
).length;

const categories =
new Set(
organizedResources.map(
resource => resource.category
)
).size;


document.getElementById(
"organizerTotalResources"
).textContent = total;


document.getElementById(
"organizerFavoriteResources"
).textContent = favorites;


document.getElementById(
"organizerPinnedResources"
).textContent = pinned;


document.getElementById(
"organizerCategoryCount"
).textContent = categories;
}


/* ---------- ESCAPE HTML ---------- */

function escapeOrganizerHTML(value) {

return String(value ?? "")
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}


/* ---------- EVENT LISTENERS ---------- */

document
.getElementById("addOrganizedResourceBtn")
.addEventListener(
"click",
() => openOrganizerResourceModal()
);


document
.getElementById("emptyOrganizerAddBtn")
.addEventListener(
"click",
() => openOrganizerResourceModal()
);


document
.getElementById("closeOrganizerModal")
.addEventListener(
"click",
closeOrganizerResourceModal
);


document
.getElementById("cancelOrganizerResourceBtn")
.addEventListener(
"click",
closeOrganizerResourceModal
);


document
.getElementById("organizerResourceForm")
.addEventListener(
"submit",
saveOrganizedResource
);


document
.getElementById("organizerResourceSearch")
.addEventListener(
"input",
renderOrganizedResources
);


document
.getElementById("organizerCategoryFilter")
.addEventListener(
"change",
renderOrganizedResources
);


document
.getElementById("organizerTypeFilter")
.addEventListener(
"change",
renderOrganizedResources
);


document
.getElementById("organizerSpecialFilter")
.addEventListener(
"change",
renderOrganizedResources
);


/* Close modal when clicking outside */

document
.getElementById("organizerResourceModal")
.addEventListener(
"click",
function(event) {

if (event.target === this) {
closeOrganizerResourceModal();
}

}
);


/* Initial render */

renderOrganizedResources();


/* =========================================================
EXAM PREPARATION PLANNER
========================================================= */

let examPreparationRecords =
JSON.parse(
localStorage.getItem("studentExamPreparation")
) || [];

let editingExamPreparationId = null;


/* =========================
SAVE DATA
========================= */

function saveExamPreparationRecords() {

localStorage.setItem(
"studentExamPreparation",
JSON.stringify(examPreparationRecords)
);
}


/* =========================
OPEN MODAL
========================= */

function openExamPreparationModal(exam = null) {

const modal =
document.getElementById("examPrepModal");

const form =
document.getElementById("examPrepForm");

const title =
document.getElementById("examPrepModalTitle");


if (exam) {

editingExamPreparationId = exam.id;

title.textContent = "Edit Exam";


document.getElementById(
"examPrepSubject"
).value = exam.subject;


document.getElementById(
"examPrepTitle"
).value = exam.title;


document.getElementById(
"examPrepDate"
).value = exam.date;


document.getElementById(
"examPrepTime"
).value = exam.time || "";


document.getElementById(
"examPrepTopics"
).value =
exam.topics
.map(topic => topic.name)
.join("\n");


document.getElementById(
"examPrepNotes"
).value = exam.notes || "";

} else {

editingExamPreparationId = null;

title.textContent = "Add Exam";

form.reset();
}


modal.classList.add("active");
}


/* =========================
CLOSE MODAL
========================= */

function closeExamPreparationModal() {

document
.getElementById("examPrepModal")
.classList.remove("active");

document
.getElementById("examPrepForm")
.reset();

editingExamPreparationId = null;
}


/* =========================
SAVE EXAM
========================= */

function saveExamPreparation(event) {

event.preventDefault();


const subject =
document
.getElementById("examPrepSubject")
.value
.trim();


const title =
document
.getElementById("examPrepTitle")
.value
.trim();


const date =
document
.getElementById("examPrepDate")
.value;


const time =
document
.getElementById("examPrepTime")
.value;


const topicsText =
document
.getElementById("examPrepTopics")
.value
.trim();


const notes =
document
.getElementById("examPrepNotes")
.value
.trim();


const topicNames =
topicsText
? topicsText
.split("\n")
.map(topic => topic.trim())
.filter(topic => topic !== "")
: [];


/* =========================
EDIT EXISTING EXAM
========================= */

if (editingExamPreparationId) {

const index =
examPreparationRecords.findIndex(
exam =>
exam.id === editingExamPreparationId
);


if (index !== -1) {

const existingExam =
examPreparationRecords[index];


const existingTopicMap =
new Map(
existingExam.topics.map(
topic => [topic.name, topic.completed]
)
);


examPreparationRecords[index] = {

...existingExam,

subject: subject,

title: title,

date: date,

time: time,

topics:
topicNames.map(name => ({

name: name,

completed:
existingTopicMap.get(name) || false

})),

notes: notes
};
}

}


/* =========================
ADD NEW EXAM
========================= */

else {

const newExam = {

id: Date.now(),

subject: subject,

title: title,

date: date,

time: time,

topics:
topicNames.map(name => ({

name: name,

completed: false

})),

notes: notes,

createdAt:
new Date().toISOString()

};


examPreparationRecords.unshift(newExam);
}


saveExamPreparationRecords();

closeExamPreparationModal();

renderExamPreparation();
}


/* =========================
CALCULATE PROGRESS
========================= */

function getExamPreparationProgress(exam) {

if (!exam.topics || exam.topics.length === 0) {
return 0;
}


const completed =
exam.topics.filter(
topic => topic.completed
).length;


return Math.round(
(completed / exam.topics.length) * 100
);
}


/* =========================
CHECK COMPLETED
========================= */

function isExamPreparationCompleted(exam) {

return getExamPreparationProgress(exam) === 100;
}


/* =========================
DAYS REMAINING
========================= */

function getExamDaysRemaining(exam) {

const examDate =
new Date(exam.date + "T00:00:00");


const today =
new Date();


today.setHours(0, 0, 0, 0);


const difference =
examDate.getTime() -
today.getTime();


return Math.ceil(
difference /
(1000 * 60 * 60 * 24)
);
}


/* =========================
COUNTDOWN TEXT
========================= */

function getExamCountdownText(exam) {

if (isExamPreparationCompleted(exam)) {

return "Preparation completed";
}


const days =
getExamDaysRemaining(exam);


if (days < 0) {

return "Exam date has passed";
}


if (days === 0) {

return "Exam is today";
}


if (days === 1) {

return "1 day remaining";
}


return `${days} days remaining`;
}


/* =========================
DATE FORMAT
========================= */

function formatExamPrepDate(dateString) {

if (!dateString) {
return "-";
}


const date =
new Date(
dateString + "T00:00:00"
);


return date.toLocaleDateString(
undefined,
{
day: "numeric",
month: "short",
year: "numeric"
}
);
}


/* =========================
TIME FORMAT
========================= */

function formatExamPrepTime(time) {

if (!time) {
return "Not set";
}


const [hours, minutes] =
time.split(":");


const date =
new Date();


date.setHours(
Number(hours),
Number(minutes)
);


return date.toLocaleTimeString(
undefined,
{
hour: "numeric",
minute: "2-digit"
}
);
}


/* =========================
GET FILTERED EXAMS
========================= */

function getFilteredExamPreparation() {

const search =
document
.getElementById("examPrepSearch")
.value
.toLowerCase()
.trim();


const filter =
document
.getElementById("examPrepFilter")
.value;


const sort =
document
.getElementById("examPrepSort")
.value;


let results =
examPreparationRecords.filter(exam => {

const searchableText =
`${exam.title}
${exam.subject}
${exam.notes || ""}`
.toLowerCase();


const matchesSearch =
!search ||
searchableText.includes(search);


const completed =
isExamPreparationCompleted(exam);


const matchesFilter =
filter === "all" ||

(filter === "completed" && completed) ||

(filter === "upcoming" && !completed);


return (
matchesSearch &&
matchesFilter
);
});


/* =========================
SORT
========================= */

if (sort === "date") {

results.sort(
(a, b) =>
new Date(a.date) -
new Date(b.date)
);

} else if (sort === "progress") {

results.sort(
(a, b) =>
getExamPreparationProgress(b) -
getExamPreparationProgress(a)
);

} else if (sort === "subject") {

results.sort(
(a, b) =>
a.subject.localeCompare(
b.subject
)
);
}


return results;
}


/* =========================
RENDER EXAMS
========================= */

function renderExamPreparation() {

const list =
document.getElementById(
"examPrepList"
);


const emptyState =
document.getElementById(
"examPrepEmptyState"
);


const filtered =
getFilteredExamPreparation();


/* =========================
NO EXAMS AT ALL
========================= */

if (
examPreparationRecords.length === 0
) {

list.innerHTML = "";

emptyState.style.display = "block";

updateExamPreparationSummary();

return;
}


emptyState.style.display = "none";


/* =========================
NO SEARCH RESULTS
========================= */

if (filtered.length === 0) {

list.innerHTML = `

<div class="exam-prep-empty-state">

<div class="exam-prep-empty-icon">
🔎
</div>

<h3>
No Matching Exams
</h3>

<p>
Try changing your search or filter.
</p>

</div>

`;

updateExamPreparationSummary();

return;
}


/* =========================
BUILD CARDS
========================= */

list.innerHTML =
filtered
.map(exam => {

const progress =
getExamPreparationProgress(exam);


const completed =
isExamPreparationCompleted(exam);


const topicsHTML =
exam.topics
.map(
(topic, index) => `

<label
class="
exam-prep-topic
${topic.completed
? "completed-topic"
: ""}
"
>

<input
type="checkbox"
${topic.completed
? "checked"
: ""}
onchange="
toggleExamTopic(
${exam.id},
${index}
)
"
>

<span>
${escapeExamPrepHTML(
topic.name
)}
</span>

</label>

`
)
.join("");


return `

<div class="exam-prep-card">

<div class="exam-prep-card-top">

<div
class="
exam-prep-card-title-area
"
>

<h3
class="
exam-prep-card-title
"
>
${escapeExamPrepHTML(
exam.title
)}
</h3>

<p
class="
exam-prep-card-subject
"
>
${escapeExamPrepHTML(
exam.subject
)}
</p>

</div>


<span
class="
exam-prep-status
${
completed
? "completed"
: "upcoming"
}
"
>
${
completed
? "Completed"
: "Upcoming"
}
</span>

</div>


<div class="exam-prep-info">

<div
class="
exam-prep-info-item
"
>

<span
class="
exam-prep-info-label
"
>
Exam Date
</span>

<span
class="
exam-prep-info-value
"
>
${formatExamPrepDate(
exam.date
)}
</span>

</div>


<div
class="
exam-prep-info-item
"
>

<span
class="
exam-prep-info-label
"
>
Exam Time
</span>

<span
class="
exam-prep-info-value
"
>
${formatExamPrepTime(
exam.time
)}
</span>

</div>

</div>


<div class="exam-prep-countdown">

${getExamCountdownText(
exam
)}

</div>


<div class="exam-prep-progress-header">

<span
class="
exam-prep-progress-label
"
>
Preparation Progress
</span>

<span
class="
exam-prep-progress-percent
"
>
${progress}%
</span>

</div>


<div
class="
exam-prep-progress-bar
"
>

<div
class="
exam-prep-progress-fill
"
style="
width: ${progress}%;
"
></div>

</div>


${
exam.topics.length > 0
? `

<div
class="
exam-prep-topics
"
>

<h4
class="
exam-prep-topics-title
"
>
Syllabus / Topics
</h4>

<div
class="
exam-prep-topic-list
"
>
${topicsHTML}
</div>

</div>

`
: ""
}


${
exam.notes
? `

<div
class="
exam-prep-notes
"
>

<strong>
Notes:
</strong>

${escapeExamPrepHTML(
exam.notes
)}

</div>

`
: ""
}


<div
class="
exam-prep-actions
"
>

<button
class="
exam-prep-action-btn
"
onclick="
editExamPreparation(
${exam.id}
)
"
>
Edit
</button>


<button
class="
exam-prep-action-btn
delete
"
onclick="
deleteExamPreparation(
${exam.id}
)
"
>
Delete
</button>

</div>

</div>

`;
})
.join("");


updateExamPreparationSummary();
}


/* =========================
TOGGLE TOPIC
========================= */

function toggleExamTopic(
examId,
topicIndex
) {

const exam =
examPreparationRecords.find(
item => item.id === examId
);


if (!exam) return;


if (!exam.topics[topicIndex]) {
return;
}


exam.topics[topicIndex].completed =
!exam.topics[topicIndex].completed;


saveExamPreparationRecords();

renderExamPreparation();
}


/* =========================
EDIT EXAM
========================= */

function editExamPreparation(id) {

const exam =
examPreparationRecords.find(
item => item.id === id
);


if (!exam) return;


openExamPreparationModal(exam);
}


/* =========================
DELETE EXAM
========================= */

function deleteExamPreparation(id) {

const exam =
examPreparationRecords.find(
item => item.id === id
);


if (!exam) return;


const confirmed =
confirm(
`Delete "${exam.title}"?`
);


if (!confirmed) {
return;
}


examPreparationRecords =
examPreparationRecords.filter(
item => item.id !== id
);


saveExamPreparationRecords();

renderExamPreparation();
}


/* =========================
SUMMARY
========================= */

function updateExamPreparationSummary() {

const total =
examPreparationRecords.length;


const completed =
examPreparationRecords.filter(
exam =>
isExamPreparationCompleted(exam)
).length;


const upcoming =
total - completed;


let average = 0;


if (total > 0) {

const totalProgress =
examPreparationRecords.reduce(
(sum, exam) =>
sum +
getExamPreparationProgress(exam),
0
);


average =
Math.round(
totalProgress / total
);
}


document.getElementById(
"totalExamPrep"
).textContent = total;


document.getElementById(
"upcomingExamPrep"
).textContent = upcoming;


document.getElementById(
"completedExamPrep"
).textContent = completed;


document.getElementById(
"averageExamPrep"
).textContent = `${average}%`;
}


/* =========================
ESCAPE HTML
========================= */

function escapeExamPrepHTML(value) {

return String(value ?? "")
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#039;");
}


/* =========================
EVENT LISTENERS
========================= */

document
.getElementById("addExamPrepBtn")
.addEventListener(
"click",
() => openExamPreparationModal()
);


document
.getElementById("emptyExamPrepBtn")
.addEventListener(
"click",
() => openExamPreparationModal()
);


document
.getElementById("closeExamPrepModal")
.addEventListener(
"click",
closeExamPreparationModal
);


document
.getElementById("cancelExamPrepBtn")
.addEventListener(
"click",
closeExamPreparationModal
);


document
.getElementById("examPrepForm")
.addEventListener(
"submit",
saveExamPreparation
);


document
.getElementById("examPrepSearch")
.addEventListener(
"input",
renderExamPreparation
);


document
.getElementById("examPrepFilter")
.addEventListener(
"change",
renderExamPreparation
);


document
.getElementById("examPrepSort")
.addEventListener(
"change",
renderExamPreparation
);


/* =========================
CLOSE MODAL OUTSIDE
========================= */

document
.getElementById("examPrepModal")
.addEventListener(
"click",
function(event) {

if (event.target === this) {

closeExamPreparationModal();
}
}
);


/* =========================
INITIAL RENDER
========================= */

renderExamPreparation();

// ===============================
// ONLINE AI STUDY ASSISTANT
// ===============================

const onlineAiSection = document.getElementById("onlineAiSection");
const onlineAiChat = document.getElementById("onlineAiChat");
const onlineAiInput = document.getElementById("onlineAiInput");
const onlineAiSendBtn = document.getElementById("onlineAiSendBtn");
const onlineAiClearBtn = document.getElementById("onlineAiClearBtn");
const onlineAiTyping = document.getElementById("onlineAiTyping");

// Add message to Online AI chat
function addOnlineAiMessage(message, sender) {
const messageElement = document.createElement("div");

messageElement.className =
sender === "user"
? "online-ai-message user-message"
: "online-ai-message ai-message";

messageElement.textContent = message;

onlineAiChat.appendChild(messageElement);

onlineAiChat.scrollTop = onlineAiChat.scrollHeight;
}


// Send question to backend
async function sendOnlineAiMessage() {
const message = onlineAiInput.value.trim();

if (!message) {
return;
}

// Show user's question
addOnlineAiMessage(message, "user");

// Clear input
onlineAiInput.value = "";

// Show typing indicator
if (onlineAiTyping) {
onlineAiTyping.style.display = "block";
}

try {
const response = await fetch("/api/ask-ai", {
method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
question: message
})
});

const data = await response.json();

if (!response.ok) {
throw new Error(
data.error || "Online AI request failed."
);
}

// Show AI response
addOnlineAiMessage(
data.answer || "I couldn't generate a response.",
"ai"
);

} catch (error) {
console.error("Online AI error:", error);

addOnlineAiMessage(
"Online AI could not connect right now. Please try again.",
"ai"
);

} finally {
// Hide typing indicator
if (onlineAiTyping) {
onlineAiTyping.style.display = "none";
}
}
}


// Send button
if (onlineAiSendBtn) {
onlineAiSendBtn.addEventListener(
"click",
sendOnlineAiMessage
);
}


// Press Enter to send
if (onlineAiInput) {
onlineAiInput.addEventListener(
"keydown",
function (event) {
if (event.key === "Enter") {
event.preventDefault();
sendOnlineAiMessage();
}
}
);
}


// Clear chat
if (onlineAiClearBtn) {
onlineAiClearBtn.addEventListener(
"click",
function () {
onlineAiChat.innerHTML = "";
}
);
}


// =========================================
// ASSIGNMENT & PRESENTATION DESIGNER
// =========================================

const designerTitle = document.getElementById("designerTitle");
const designerSubtitle = document.getElementById("designerSubtitle");
const designerContent = document.getElementById("designerContent");

const designerFont = document.getElementById("designerFont");
const designerFontSize = document.getElementById("designerFontSize");

const previewTitle = document.getElementById("previewTitle");
const previewSubtitle = document.getElementById("previewSubtitle");
const previewContent = document.getElementById("previewContent");
const designPreview = document.getElementById("designPreview");

const previewAccessories =
document.getElementById("previewAccessories");


// -----------------------------------------
// LIVE TEXT PREVIEW
// -----------------------------------------

function updateDesignerPreview() {

previewTitle.textContent =
designerTitle.value || "Your Title";

previewSubtitle.textContent =
designerSubtitle.value || "Course / Subject";

previewContent.textContent =
designerContent.value ||
"Your content will appear here.";

previewContent.style.fontFamily =
designerFont.value;

previewContent.style.fontSize =
designerFontSize.value + "px";
}


if (designerTitle) {
designerTitle.addEventListener(
"input",
updateDesignerPreview
);
}

if (designerSubtitle) {
designerSubtitle.addEventListener(
"input",
updateDesignerPreview
);
}

if (designerContent) {
designerContent.addEventListener(
"input",
updateDesignerPreview
);
}

if (designerFont) {
designerFont.addEventListener(
"change",
updateDesignerPreview
);
}

if (designerFontSize) {
designerFontSize.addEventListener(
"change",
updateDesignerPreview
);
}


// -----------------------------------------
// ASSIGNMENT / PRESENTATION TYPE
// -----------------------------------------

// -----------------------------------------
// ASSIGNMENT / PRESENTATION TYPE
// -----------------------------------------

const workTypeButtons =
document.querySelectorAll(".work-type-btn");

workTypeButtons.forEach(function (button) {

button.addEventListener("click", function () {

workTypeButtons.forEach(function (item) {
item.classList.remove("active");
});

button.classList.add("active");

const selectedType =
button.dataset.workType;

if (selectedType === "assignment") {

previewTitle.textContent =
designerTitle.value || "Your Assignment";

previewSubtitle.textContent =
designerSubtitle.value || "Course / Subject";

previewContent.style.minHeight = "320px";
designPreview.classList.remove("presentation-mode");


}

if (selectedType === "presentation") {

previewTitle.textContent =
designerTitle.value || "Your Presentation";

previewSubtitle.textContent =
designerSubtitle.value || "Course / Subject";

previewContent.style.minHeight = "220px";

designPreview.classList.add("presentation-mode");

}
});

});



// -----------------------------------------
// TEMPLATE SELECTION
// -----------------------------------------

const templateButtons =
document.querySelectorAll(".template-card");

templateButtons.forEach(function (button) {

button.addEventListener("click", function () {

templateButtons.forEach(function (item) {
item.classList.remove("active");
});

button.classList.add("active");

const selectedTemplate =
button.dataset.template;

designPreview.classList.remove(
"academic-style",
"modern-style",
"minimal-style",
"professional-style"
);

designPreview.classList.add(
selectedTemplate + "-style"
);

});

});


// -----------------------------------------
// TEXT FORMATTING
// -----------------------------------------

const designerBold =
document.getElementById("designerBold");

const designerItalic =
document.getElementById("designerItalic");

const designerUnderline =
document.getElementById("designerUnderline");

const designerAlignLeft =
document.getElementById("designerAlignLeft");

const designerAlignCenter =
document.getElementById("designerAlignCenter");

const designerAlignRight =
document.getElementById("designerAlignRight");


if (designerBold) {

designerBold.addEventListener("click", function () {

previewContent.style.fontWeight =
previewContent.style.fontWeight === "700"
? "400"
: "700";

});

}


if (designerItalic) {

designerItalic.addEventListener("click", function () {

previewContent.style.fontStyle =
previewContent.style.fontStyle === "italic"
? "normal"
: "italic";

});

}


if (designerUnderline) {

designerUnderline.addEventListener("click", function () {

previewContent.style.textDecoration =
previewContent.style.textDecoration === "underline"
? "none"
: "underline";

});

}


if (designerAlignLeft) {

designerAlignLeft.addEventListener("click", function () {
previewContent.style.textAlign = "left";
});

}


if (designerAlignCenter) {

designerAlignCenter.addEventListener("click", function () {
previewContent.style.textAlign = "center";
});

}


if (designerAlignRight) {

designerAlignRight.addEventListener("click", function () {
previewContent.style.textAlign = "right";
});

}


// -----------------------------------------
// DESIGN ACCESSORIES
// -----------------------------------------

const accessoryButtons =
document.querySelectorAll(".accessory-btn");

accessoryButtons.forEach(function (button) {

button.addEventListener("click", function () {

const accessory =
button.dataset.accessory;

if (accessory === "divider") {

previewAccessories.innerHTML += `
<div class="preview-accessory-divider"></div>
`;

}

if (accessory === "quote") {

previewAccessories.innerHTML += `
<div class="preview-quote">
Add an important quote or key point here.
</div>
`;

}

if (accessory === "table") {

previewAccessories.innerHTML += `
<table class="preview-table">
<tr>
<td>Item</td>
<td>Details</td>
</tr>
<tr>
<td>Course</td>
<td>Student Work</td>
</tr>
</table>
`;

}

if (accessory === "image") {

previewAccessories.innerHTML += `
<div class="preview-quote">
🖼 Image / diagram space
</div>
`;

}

});

});


// -----------------------------------------
// SAVE DESIGN
// -----------------------------------------

const saveDesignBtn =
document.getElementById("saveDesignBtn");

if (saveDesignBtn) {

saveDesignBtn.addEventListener(
"click",
function () {

const design = {
title: designerTitle.value,
subtitle: designerSubtitle.value,
content: designerContent.value,
font: designerFont.value,
fontSize: designerFontSize.value
};

localStorage.setItem(
"studentAppDesign",
JSON.stringify(design)
);

alert(
"Your design has been saved successfully."
);

}
);

}


// -----------------------------------------
// LOAD SAVED DESIGN
// -----------------------------------------

const savedDesign =
localStorage.getItem("studentAppDesign");

if (savedDesign) {

const design =
JSON.parse(savedDesign);

designerTitle.value =
design.title || "";

designerSubtitle.value =
design.subtitle || "";

designerContent.value =
design.content || "";

designerFont.value =
design.font || "Arial";

designerFontSize.value =
design.fontSize || "16";

updateDesignerPreview();

}
