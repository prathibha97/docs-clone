export const templates = [
  {
    id: 'blank',
    label: 'Blank Document',
    imageUrl: '/blank-document.svg',
    initialContent: ``,
  },
  {
    id: 'software-proposal',
    label: 'Software Development Proposal',
    imageUrl: '/software-proposal.svg',
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>Project Overview</h2>
      <p>This document outlines the proposed development of the software solution to meet the client's requirements.</p>
      <h2>Objectives</h2>
      <ul>
        <li>Deliver a scalable and efficient solution.</li>
        <li>Ensure compatibility with existing systems.</li>
        <li>Provide user-friendly interfaces.</li>
      </ul>
      <h2>Timeline</h2>
      <p>Estimated completion: 6 months</p>
    `,
  },
  {
    id: 'project-proposal',
    label: 'Project Proposal',
    imageUrl: '/project-proposal.svg',
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Title</h2>
      <p>Insert the project title here.</p>
      <h2>Summary</h2>
      <p>This project aims to [insert goals here].</p>
      <h2>Scope</h2>
      <p>The scope of this project includes the following:</p>
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    `,
  },
  {
    id: 'business-letter',
    label: 'Business Letter',
    imageUrl: '/business-letter.svg',
    initialContent: `
      <p>Your Name<br>Company Name<br>Address<br>City, State, ZIP</p>
      <p>Date</p>
      <p>Recipient Name<br>Recipient Company<br>Recipient Address<br>City, State, ZIP</p>
      <p>Dear [Recipient Name],</p>
      <p>I am writing to discuss [insert topic here]. Please find the details enclosed.</p>
      <p>Thank you for your time.</p>
      <p>Sincerely,<br>Your Name</p>
    `,
  },
  {
    id: 'resume',
    label: 'Resume',
    imageUrl: '/resume.svg',
    initialContent: `
      <h1>Your Name</h1>
      <p>Contact Information</p>
      <h2>Objective</h2>
      <p>To secure a position as [position] at [company].</p>
      <h2>Experience</h2>
      <ul>
        <li><b>Company Name</b>, Role (Start Date - End Date)</li>
        <li>Responsibilities and achievements.</li>
      </ul>
      <h2>Education</h2>
      <p>Institution Name - Degree (Year)</p>
    `,
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    imageUrl: '/cover-letter.svg',
    initialContent: `
      <p>Your Name<br>Address<br>City, State, ZIP</p>
      <p>Date</p>
      <p>Hiring Manager<br>Company Name<br>Address<br>City, State, ZIP</p>
      <p>Dear [Hiring Manager],</p>
      <p>I am writing to express my interest in the [position] role at [company]. I believe my skills and experience align with the requirements of this position.</p>
      <p>Thank you for considering my application. I look forward to the opportunity to discuss further.</p>
      <p>Sincerely,<br>Your Name</p>
    `,
  },
  {
    id: 'letter',
    label: 'Letter',
    imageUrl: '/letter.svg',
    initialContent: `
      <p>Your Name<br>Address<br>City, State, ZIP</p>
      <p>Date</p>
      <p>Recipient Name<br>Address<br>City, State, ZIP</p>
      <p>Dear [Recipient],</p>
      <p>Write the body of your letter here. Include all relevant information.</p>
      <p>Sincerely,<br>Your Name</p>
    `,
  },
] as const;
