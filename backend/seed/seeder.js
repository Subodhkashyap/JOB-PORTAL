
require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../models/User");
const Job = require("../models/Job");

const MONGO_URI = process.env.MONGO_URI;

const companyPrefixes = [
  "Nova",
  "Vertex",
  "Quantum",
  "Blue",
  "Prime",
  "Bright",
  "Cloud",
  "Apex",
  "Next",
  "Global",
  "Digital",
  "Future",
  "Smart",
  "Tech",
  "Core",
  "Elite",
  "Urban",
  "Rapid",
  "Secure",
  "Vision"
];

const companyWords = [
  "Technologies",
  "Systems",
  "Labs",
  "Solutions",
  "Works",
  "Innovations",
  "Digital",
  "Software",
  "Industries",
  "Services"
];

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Consulting",
  "Automotive",
  "Telecom",
  "Cybersecurity",
  "Software",
  "Manufacturing",
  "Logistics",
  "Media",
  "Travel",
  "Energy"
];

const locations = [
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi",
  "Noida",
  "Gurgaon",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Indore",
  "Chandigarh",
  "Remote"
];

const jobTitles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "React Developer",
  "Java Developer",
  "Python Developer",
  "Node.js Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "Data Analyst",
  "Data Scientist",
  "UI/UX Designer",
  "Product Manager",
  "Business Analyst",
  "QA Engineer",
  "Network Engineer",
  "HR Executive",
  "Marketing Executive"
];

const categories = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Consulting",
  "Automotive",
  "Telecom",
  "Cybersecurity",
  "Software",
  "Manufacturing",
  "Logistics",
  "Media",
  "Travel",
  "Energy"
];

// IMPORTANT: These values must exactly match Job.js enum.
const jobTypes = [
  "Full-Time",
  "Remote",
  "Part-Time",
  "Contract",
  "Internship"
];

const experienceLevels = [
  "Fresher",
  "Entry Level",
  "1-3 Years",
  "3-5 Years",
  "5+ Years"
];

const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Java",
  "Python",
  "SQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "Cybersecurity",
  "Linux",
  "REST API"
];

function createCompanyName(index) {
  const prefix =
    companyPrefixes[index % companyPrefixes.length];

  const word =
    companyWords[
      Math.floor(index / companyPrefixes.length) %
        companyWords.length
    ];

  return `${prefix} ${word} ${index + 1}`;
}

function createDescription(company, title, category) {
  return `${company} is hiring a ${title} for its ${category} team. The successful candidate will work on real-world products, collaborate with cross-functional teams, solve technical and business problems, and contribute to scalable and reliable solutions.`;
}

function createRequirements(title, experienceLevel) {
  return [
    "Bachelor's degree or equivalent qualification",
    "Good understanding of professional development practices",
    "Strong problem-solving and communication skills",
    `Experience or academic knowledge related to ${title}`,
    `Suitable for candidates with ${experienceLevel} experience`,
    "Ability to work effectively in a team"
  ].join("\n");
}

function getJobType(index) {
  // Balanced distribution across all job types.
  const position = index % 20;

  if (position < 8) return "Full-Time";
  if (position < 12) return "Remote";
  if (position < 15) return "Part-Time";
  if (position < 18) return "Contract";

  return "Internship";
}

async function seed() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    // --------------------------------------------------
    // 1. CREATE / REUSE 200 EMPLOYERS
    // --------------------------------------------------

    const employers = [];

    for (let i = 0; i < 200; i++) {
      const companyName = createCompanyName(i);

      const email =
        `seed.employer.${i + 1}@jobportal.local`;

      let employer = await User.findOne({ email });

      if (!employer) {
        employer = await User.create({
          name: `${companyName} HR`,
          email,
          password: "SeedEmployer@12345",
          role: "employer",

          companyName,

          companyDescription:
            `${companyName} is a growing organization operating in the ${
              industries[i % industries.length]
            } industry.`,

          companyLogo:
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              companyName
            )}&background=random`
        });
      }

      employers.push(employer);
    }

    console.log(`Employers ready: ${employers.length}`);

    // --------------------------------------------------
    // 2. DELETE ONLY JOBS BELONGING TO SEEDED EMPLOYERS
    // --------------------------------------------------

    const employerIds = employers.map(
      (employer) => employer._id
    );

    await Job.deleteMany({
      company: { $in: employerIds }
    });

    // --------------------------------------------------
    // 3. CREATE 400 JOBS
    // --------------------------------------------------

    const jobs = [];

    for (let i = 0; i < 400; i++) {
      const employer =
        employers[i % employers.length];

      const title =
        jobTitles[i % jobTitles.length];

      const location =
        locations[i % locations.length];

      const category =
        categories[i % categories.length];

      const type = getJobType(i);

      const experienceLevel =
        experienceLevels[i % experienceLevels.length];

      const skill1 =
        skills[i % skills.length];

      const skill2 =
        skills[(i + 3) % skills.length];

      const skill3 =
        skills[(i + 7) % skills.length];

      const salaryMin =
        300000 + (i % 10) * 100000;

      const salaryMax =
        salaryMin + 300000;

      const applicationDeadline =
        new Date(
          Date.now() +
            (15 + (i % 60)) *
              24 *
              60 *
              60 *
              1000
        );

      const job = {
        title: `${title} - ${i + 1}`,

        description: createDescription(
          employer.companyName,
          title,
          category
        ),

        requirements: createRequirements(
          title,
          experienceLevel
        ),

        location,

        category,

        type,

        company: employer._id,

        salaryMin,

        salaryMax,

        skills: [
          skill1,
          skill2,
          skill3
        ],

        experienceLevel,

        applicationDeadline,

        isClosed: false
      };

      jobs.push(job);
    }

    // --------------------------------------------------
    // 4. INSERT JOBS
    // --------------------------------------------------

    const insertedJobs =
      await Job.insertMany(jobs);

    // --------------------------------------------------
    // 5. PRINT SUMMARY
    // --------------------------------------------------

    const typeCounts = {};

    insertedJobs.forEach((job) => {
      typeCounts[job.type] =
        (typeCounts[job.type] || 0) + 1;
    });

    const categoryCounts = {};

    insertedJobs.forEach((job) => {
      categoryCounts[job.category] =
        (categoryCounts[job.category] || 0) + 1;
    });

    console.log("");
    console.log("--------------------------------");
    console.log("SEED COMPLETED");
    console.log("--------------------------------");

    console.log(
      `Employers/Companies: ${employers.length}`
    );

    console.log(
      `Jobs inserted: ${insertedJobs.length}`
    );

    console.log("");
    console.log("JOB TYPES:");

    Object.entries(typeCounts).forEach(
      ([type, count]) => {
        console.log(`  ${type}: ${count}`);
      }
    );

    console.log("");
    console.log("CATEGORIES:");

    Object.entries(categoryCounts).forEach(
      ([category, count]) => {
        console.log(`  ${category}: ${count}`);
      }
    );

    console.log("--------------------------------");

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("SEED ERROR:");
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

seed();

