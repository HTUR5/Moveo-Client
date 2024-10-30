<h1>Band Management Platform</h1>

<p>A full-stack application designed to manage and coordinate band performances. Built with a React frontend and a Node.js/Express backend, this app allows users to register, log in, and access performance and practice-related features based on their roles (admin or user). Key functionalities include live performance synchronization, user role management, and song display, showing lyrics and chords tailored to the user's instrument.</p>

<h2>Related Repositories</h2>
<ul>
  <li><a href="https://github.com/HTUR5/Moveo-Server" target="_blank">The Band Server Repository</a></li>
</ul>

<h2>Features</h2>
<ul>
  <li><strong>User Registration & Login</strong><br>
    Admins and users can create accounts and log in, with role-based access controls. User passwords are securely hashed using <strong>bcrypt</strong> to enhance security.</li>
  <li><strong>Live Performance Synchronization</strong><br>
    The admin can control live playback settings shared across all users.</li>
  <li><strong>Auto-Scroll Lyrics & Chords</strong><br>
    Song lyrics display with auto-scroll</li>
  <li><strong>Role-based Navigation</strong><br>
    Custom navigation paths and permissions for admins and standard users.</li>
  <li><strong>Search feature</strong><br>
  The search feature in this project is designed to return results that match the user's input. Specifically:<br>
- If the user provides a search term, the application will filter results to include only those that contain the search term in relevant fields.<br>
- If the search input is empty, the application will return all available items by default.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li><strong>Frontend:</strong> React, React Router, CSS Modules</li>
  <li><strong>Backend:</strong> Node.js, Express.js, bcrypt (for password hashing)</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>Real-time Communication:</strong> Socket.io</li>
</ul>

<h2>Security</h2>
<p><strong>Password Hashing with bcrypt</strong><br>
To protect user credentials, passwords are hashed using bcrypt before being stored. This ensures passwords are not stored in plain text, providing security against unauthorized access.</p>

<h2>For running:</h2>
<p>client: npm run dev<br>
  server: npm run start</p>


<h2>A video of Admin use</h2>
https://github.com/user-attachments/assets/d3e20e04-18c3-4a1d-9743-bb24dd0ecf7d




