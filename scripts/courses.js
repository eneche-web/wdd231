const courses = [
    {sbuject: "CSE", number:110, title:"Indroduction to Programming", credits: 2, completed: true},
    {subject: "WDD", number:130, title:"Web Fundermentals", credits: 2, completed: true},
    {subject: "CSE", number:111, title:"Programming with Functions", credits: 2, completed: true},
    {subject: "ITM", number:111, title:"Introduction to Database", credits: 2, completed: true},
    {subject: "CSE", number:210, title:"Programming with Classes", credits: 2, completed: true},
    {subject: "WDD", number:231, title:"Web Frontend Development 1", credcits: 2, completed: false},
    {subject: "CSE", number:212, title:"programming With Data Structures", credits: 2, completed: false},
    {subject: "WDD", number:330, title:"Web Frntend Development 2", credits: 2, completed: false},
    {subject: "CSE", number:270, title:"Software Testing", credits: 2, completed: false},
    {subject: "WDD", number:430, title:"Web Full-stack Development", credits: 2, completed: false},
    {subject: "CSE", number:300, title:"Professional Readiness", credits: 2, completed: false},
    {subject: "CSE", number:340, titl:"Web Backend Development", credits: 2, completed: false},
    {subject: "CSE", number:310, title:"Applied Programming", credits: 2, completed: false},
    {subject: "CSE", number:341, title:"Web Service", credits: 2, completed: false},
    {subject: "CSE", number:370, title:"Software Engineering Principles", credits: 2, completed: false},
    {subject: "CSE", number:499, title:"Senior Project", credits: 2, completed: false}
];

const allButton = document.querySelector("#all-courses");

const wddButton = document.querySelector("#wdd-cousres");

const cseButton = document.querySelector("#cse-courrses");

function displayCourse(courseList){
    coursecontainer.innerHTML = "";

    courseList.forEach(course =>{
        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed){
            card.classList.add("completed");
        }

        card.innerHTML = `<h3>
            ${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>`;

            courseContainer.appendChild(card);
    });

    calculateCredits(courseList);



    }


    function calculateCredits(courseList){
        const credits = courseList.reduce(
            (total, course) => total + course.credits, 0
        );

        totalCredits.textContent = credits;
    }


    function setActiveButton(button){
        document.querySelectorAll(".filter-button").forEach(item =>item.classList.remove("active"));

        button.classList.add("active");

    }


    allButton.addEventListener("click", ()=>{
        displayCourses(courses);

        setActiveButton(allButton);
    });


    wddButton.addEventListener("click", ()=>{
        const wddCourse = courses.filter(
            course => course.subject === "WDD"
        );

        displayCourses(wddCourses);

        setActiveButton(wddButton);
    });


    cseButton.addEventListener("click", ()=>{
        const cseCourses = courses.filter(
            course => course.subject === "CSE"
        );

        displayCourses(cseCourses);

        setActiveButton(cseButton);
    });

    displayCourses(courses);