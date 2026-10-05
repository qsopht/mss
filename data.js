/* Content sourced and condensed from the UNC-Chapel Hill Information Security
   Controls Standard ("Minimum Security Standard" / MSS):
   https://policies.unc.edu/TDClient/2833/Portal/KB/Article/131245/Information-Security-Controls-Standard
   Codes: A = applies to all systems at that level. S = applies only to IT Services
   (systems made available to people outside your own workgroup). An em dash (—)
   means the control is not required at that level. */

const MSS_DATA = {

  meta: {
    title: "Standard on Information Security Controls",
    shortName: "Minimum Security Standard (MSS)",
    sourceUrl: "https://policies.unc.edu/TDClient/2833/Portal/KB/Article/131245/Information-Security-Controls-Standard",
    purpose: "The Minimum Security Standard sets risk-based security controls for every piece of technology used at or for UNC-Chapel Hill. It applies regardless of who owns or manages the system.",
    scope: [
      "Connects to a University network",
      "Is hosted on a University-registered internet domain",
      "Is used for University purposes",
      "Stores, processes, or transmits data the University is responsible for (“University Data”)"
    ],
    scopeNote: "This includes every affiliated person, third parties providing IT services, in-house developed software, and IoT devices — and personal devices used for University business."
  },

  baselineLevels: [
    {
      id: "low",
      label: "Low",
      color: "low",
      who: "Public or low-risk information",
      description: "Basic security hygiene for systems that hold public or low-risk information. These are not systems that other IT depends on, and your unit does not consider them critical.",
      example: "A public-facing marketing site with no logins, or a personal laptop used only for email and calendar."
    },
    {
      id: "moderate",
      label: "Moderate",
      color: "moderate",
      who: "Tier 2 — Confidential data",
      description: "For systems that process, store, or transmit data that must stay confidential to the organization. This is the baseline most Business School course, research, and administrative systems should plan around.",
      example: "A grading spreadsheet, a recruiting pipeline with applicant information, an internal budget tool, or any system holding student records.",
      isFocus: true
    },
    {
      id: "high",
      label: "High",
      color: "high",
      who: "Tier 3 — Need-to-know data",
      description: "For systems processing up to Tier 3 data with a strict need-to-know obligation, and for anything the University designates “Critical IT Infrastructure” regardless of your own assessment.",
      example: "Systems holding protected health information, Social Security numbers, or payment card data, and infrastructure the University can't function without."
    }
  ],

  roles: [
    {
      id: "unit-head",
      label: "Unit Head",
      description: "Accountable for MSS compliance across every IT system and service your unit uses, including adopting the CISO/CIO's annual priority controls. You must run an exception process for accepting risk when a control can't be fully met."
    },
    {
      id: "responsible-person",
      label: "Responsible Person",
      description: "You're in control of a specific IT system or vendor relationship and are tasked with putting the required controls in place. By default, this is whoever wants to use a given piece of technology."
    },
    {
      id: "service-provider",
      label: "Service Provider",
      description: "You make an IT system available to people outside your own workgroup (a shared tool, a departmental app). You must meet every control tagged “Applies to Services,” no matter where the service is hosted."
    },
    {
      id: "individual",
      label: "Individual",
      description: "Everyone in scope. You're responsible for the security of your own personal and University-assigned devices, including a personal device you use for University business."
    }
  ],

  determineQuestions: [
    "What is the baseline security protection level of the system? (Low, Moderate, or High)",
    "Do any external obligations apply? (e.g. HIPAA, FERPA, PCI-DSS, CJIS, DoD contract — or none)",
    "How mission-critical is the system to your unit?"
  ],

  /* ---- Categories I-XVIII, straight from the Standard's control tables ---- */
  categories: [
    {
      numeral: "I", id: "planning", title: "Planning",
      intro: "Security planning and responsibilities are clear, assigned, and agreed.",
      controls: [
        { name: "Accountable person", desc: "Identify the Accountable person by title.", low: "S", moderate: "S", high: "A" },
        { name: "Responsible person", desc: "Name a person responsible for each device (Asset Management), application, system, and service (Service Owner).", low: "A", moderate: "A", high: "A" },
        { name: "Contact person", desc: "Name and title the Responsible single UNC point of contact to the UNC Operations Center. (Services that run on a UNC network, and high risk systems).", low: "—", moderate: "A", high: "A" },
        { name: "Data Flow documentation", desc: "Document basic architecture and essential data flows. Show the system in its environment including relationships and data movement.", low: "—", moderate: "S", high: "S" },
        { name: "Characterize data", desc: "Identify data in scope by type (including obligations that apply) and classify it according to the organization’s schema.", low: "A", moderate: "A", high: "A" },
        { name: "Protection Obligation Level", desc: "Based on data in scope and University IT system context, determine the cybersecurity category Low/Moderate/High. Consult campus authorities if you are unsure.", low: "A", moderate: "A", high: "A" },
        { name: "External obligations", desc: "Identify external obligations. Include contract and regulatory obligations specific to the system. Consult campus authorities if you are unsure.", low: "A", moderate: "A", high: "A" },
        { name: "Resiliency Determination", desc: "Establish resiliency requirements based on mission criticality, considering uptime and impact on business operations. At discretion of Responsible and Accountable persons, apply the Availability Overlay.", low: "—", moderate: "S", high: "S" },
        { name: "SAI registration", desc: "Register the service with the System Administration Initiative (SAI).", low: "—", moderate: "S", high: "S" },
        { name: "Roles Defined", desc: "Identify, agree on, and document operational roles and responsibilities.", low: "—", moderate: "A", high: "A" },
        { name: "Multi-Org Structure", desc: "If multiple organizations are involved, clearly determine who can investigate incidents, who decides to declare a breach, and who carries out breach-response duties.", low: "—", moderate: "—", high: "S" },
        { name: "Agreement terms", desc: "Third-party organizations with operational roles have proper agreement terms governing their security obligations and commitments.", low: "—", moderate: "S", high: "A" },
        { name: "Service Level Agreement", desc: "Define the shared responsibility model between the service and the people who use it. Make clear what they must and must not do.", low: "S", moderate: "S", high: "S" },
        { name: "Sustainable New", desc: "Unit has a plan to financially sustain service/system operations for University IT.", low: "—", moderate: "A", high: "A" },
        { name: "Sustainable Existing", desc: "Unit has a plan to financially sustain service/system operations for University IT.", low: "—", moderate: "Future", high: "Future" },
        { name: "Guardrails for Use", desc: "IT Service Owner creates and follows a plan to monitor or check for correct use, and manage, re-train, or otherwise address misuse of a system above its designated protection level.", low: "S", moderate: "S", high: "S" },
        { name: "Security Plan", desc: "Document control planning. Moderate: maintain a record of planning and provide to ISO if asked. High: provide documentation to ISO for review and respond to required changes. Update when intended use or protection obligation changes.", low: "—", moderate: "S", high: "S" }
      ]
    },
    {
      numeral: "II", id: "physical-location", title: "Physical Location",
      intro: "The system is housed in a location with adequate physical security and a documented physical security plan. Use proper measures to protect the system or media and allow only authorized people physical access.",
      note: "This section is considered addressed if covered devices are located in ITS Data Centers.",
      controls: [
        { name: "Door Alarms", desc: "Alarm entrance/exit doors to notify physical security responders when triggered.", low: "—", moderate: "—", high: "S" },
        { name: "Door Locks", desc: "Lock entrance/exit doors.", low: "—", moderate: "S", high: "S" },
        { name: "Access codes", desc: "Require individual access codes, tokens, or better methods to enter/exit secured rooms. Manage the codes, tokens, or keys.", low: "—", moderate: "—", high: "S" },
        { name: "Limited door access", desc: "Grant door access to individuals on a need-to-have basis using a defined process.", low: "—", moderate: "—", high: "S" },
        { name: "Visitors", desc: "Document and follow a guest access approval and logging process.", low: "—", moderate: "—", high: "S" },
        { name: "Check entry logs", desc: "Regularly review access list and logs for anomalies and appropriateness.", low: "—", moderate: "—", high: "S" },
        { name: "Security cameras", desc: "Cameras watch entry/exit points and key interior spaces, and video footage is properly retained.", low: "—", moderate: "—", high: "S" },
        { name: "Space access rules", desc: "Distribute an annual rules reminder to people with access to critical spaces.", low: "—", moderate: "—", high: "S" }
      ]
    },
    {
      numeral: "III", id: "supported-os", title: "Supported Operating Systems",
      intro: "Use only operating systems that are supported. Configure and secure them properly. Applies to laptops, desktops, servers, virtual systems, and containerized systems.",
      controls: [
        { name: "Supported OS", desc: "The vendor or open-source project has security patches promptly available for the OS version (“supported”).", low: "A", moderate: "A", high: "A" },
        { name: "Patch OS", desc: "Apply security-relevant patches promptly, following the Vulnerability Management Standard.", low: "A", moderate: "A", high: "A" },
        { name: "Migrate systems", desc: "The Unit plans for and can migrate systems to supported operating systems before the current OS becomes unsupported.", low: "A", moderate: "A", high: "A" },
        { name: "Configuration", desc: "Apply security configuration and hardening by adopting or adapting vendor-recommended configurations, or documenting and applying unit-specific configurations.", low: "—", moderate: "S", high: "A" },
        { name: "Antimalware", desc: "Install and configure a modern Endpoint Detection and Response (EDR) agent, or an operational antimalware program for personally owned devices.", low: "A", moderate: "A", high: "A" },
        { name: "OS network profile", desc: "The network profile of the system is configured to the minimum needed to be functional (e.g. use VPN or Bastion appropriately).", low: "—", moderate: "—", high: "A" },
        { name: "Disable services", desc: "Disable or remove unnecessary services (e.g. remote desktop/screen-sharing, xWindows, other built-in services not needed).", low: "—", moderate: "—", high: "A" },
        { name: "Lifecycle OS", desc: "Have a lifecycle plan (hardware, license cost, cloud budget) so required OS upgrades and patches have the necessary resources.", low: "—", moderate: "A", high: "A" }
      ]
    },
    {
      numeral: "IV", id: "supported-software", title: "Supported Software",
      intro: "All installed software (including libraries, utilities, etc.) must be supported and secured.",
      controls: [
        { name: "Ongoing Software support", desc: "The software/library supplier has security patches promptly available for identified security gaps (“supported”).", low: "A", moderate: "A", high: "A" },
        { name: "Patch software", desc: "Apply security-relevant patches promptly, following the Vulnerability Management Standard.", low: "A", moderate: "A", high: "A" },
        { name: "Migrate software", desc: "The Unit plans for and can migrate to a supported application package before the current version becomes unsupported.", low: "A", moderate: "A", high: "A" },
        { name: "Harden software", desc: "Units apply a configuration and security hardening standard for the software.", low: "—", moderate: "S", high: "A" },
        { name: "Software profile", desc: "Configure the network profile of software components to only what is needed (e.g. use VPN or Bastion appropriately).", low: "—", moderate: "—", high: "A" },
        { name: "Disable functions", desc: "Remove or disable unnecessary libraries and functions, following the principle of “Least Functionality.”", low: "—", moderate: "—", high: "A" },
        { name: "Lifecycle Software (New)", desc: "Units must budget and plan for hardware replacement and license costs so upgrades and patching aren’t resource-constrained.", low: "—", moderate: "A", high: "A" },
        { name: "Lifecycle Software (Existing)", desc: "Units must budget and plan for hardware replacement and license costs so upgrades and patching aren’t resource-constrained.", low: "—", moderate: "July 1, 2026", high: "July 1, 2025" }
      ]
    },
    {
      numeral: "V", id: "vulnerability-management", title: "Vulnerability Management",
      intro: "Plan for Vulnerability Management and do it.",
      controls: [
        { name: "Identify owners", desc: "Name owners for all software (OS, libraries, firmware, applications). Owners watch for vulnerability announcements and patch availability.", low: "A", moderate: "A", high: "A" },
        { name: "Patch vulnerabilities", desc: "Patch promptly, no slower than the Vulnerability Management Standard requires.", low: "A", moderate: "A", high: "A" },
        { name: "Expedited patching", desc: "Critical security flaws can be patched on an expedited schedule following the Vulnerability Management Standard.", low: "A", moderate: "A", high: "A" },
        { name: "Patch Internet Accessible", desc: "Internet-accessible system components are patched more quickly than non-Internet-accessible components.", low: "A", moderate: "A", high: "A" },
        { name: "Patch testing", desc: "Systems have test plans and maintenance windows to address both routine and emergency patching in a timely way.", low: "—", moderate: "S", high: "A" },
        { name: "Scanning", desc: "Conduct routine automated scans to check for vulnerabilities in operating systems and software components.", low: "—", moderate: "S", high: "A" }
      ]
    },
    {
      numeral: "VI", id: "authentication", title: "Authentication and Authorization",
      intro: "People who use University IT must be authorized and authenticated appropriately for each system (unless the service is intentionally public/unauthenticated). Controls apply to Individual, Privileged, and Service accounts unless noted otherwise. Follow the Access Control Standard and Authentication Standard.",
      controls: [
        { name: "Use Approved University Credentials", desc: "Assign individual accounts on University systems using University credentialing and access processes (Onyen or GuestID).", low: "—", moderate: "S", high: "S" },
        { name: "University SSO", desc: "Web applications must use the University Single Sign-On service for authentication.", low: "—", moderate: "—", high: "S" },
        { name: "No reuse", desc: "Change and do not reuse default passwords for any accounts.", low: "A", moderate: "A", high: "A" },
        { name: "Complexity", desc: "Follow password complexity and reuse requirements in the Authentication Standard.", low: "A", moderate: "A", high: "A" },
        { name: "Different passwords", desc: "Every account must have distinct credentials (don’t reuse the same password).", low: "A", moderate: "A", high: "A" },
        { name: "Lock out", desc: "Change all Service and privileged account passwords when someone who knew them leaves their role.", low: "—", moderate: "A", high: "A" },
        { name: "Account purpose", desc: "Do not use service accounts as individual accounts or vice versa, or any account for anything outside its intended purpose.", low: "A", moderate: "A", high: "A" },
        { name: "Privileged use", desc: "Only use privileged accounts for tasks that need the elevated privileges.", low: "—", moderate: "A", high: "A" },
        { name: "Secure passwords", desc: "Use industry-standard secret-management tools for sensitive credentials. Never put credentials in source code or config files.", low: "A", moderate: "A", high: "A" },
        { name: "MFA", desc: "Individual and privileged accounts require Multi-factor Authentication (MFA), per the Authentication Standard.", low: "—", moderate: "A", high: "A" },
        { name: "Remove accounts", desc: "Find and remove/disable/expire accounts of people no longer authorized. (Privileged & service accounts at Low; all account types at Moderate and High.)", low: "A", moderate: "A", high: "A" },
        { name: "Remove privileges", desc: "Change or remove account privileges as people change roles. (Privileged at Moderate/High; also Individual accounts at High.)", low: "—", moderate: "A", high: "A" },
        { name: "Review permissions", desc: "Maintain an inventory of privileged and service accounts and permissions. Review on a defined schedule, at least annually.", low: "—", moderate: "A", high: "A" },
        { name: "Enhanced MFA", desc: "Use enhanced, risk-based, multi-factor or passkey/passwordless authentication for highest-risk accounts (e.g. Global Admin). Applies to privileged accounts.", low: "—", moderate: "—", high: "S" },
        { name: "Identify people", desc: "System requires appropriate identity proofing for account access. Applies to privileged at all levels, and Individual at High.", low: "S", moderate: "S", high: "S" },
        { name: "Active authorization", desc: "Make explicit authorization decisions for your system — an active Onyen or GuestID is not sufficient. Applies to privileged at all levels, Individual at Moderate and High.", low: "S", moderate: "S", high: "A" },
        { name: "Encrypt log-in", desc: "Only authenticate over encrypted network protocols using industry-standard strong cryptography.", low: "A", moderate: "A", high: "A" },
        { name: "Password Guessing", desc: "Use automated methods to limit brute-force password-guessing attacks (rate limiting, account locking, or similar).", low: "A", moderate: "A", high: "A" }
      ]
    },
    {
      numeral: "VII", id: "encryption", title: "Encryption",
      intro: "Encrypt confidential and need-to-know data.",
      controls: [
        { name: "Encrypt password", desc: "Encrypt secrets: passwords, authentication tokens, API keys, etc.", low: "A", moderate: "A", high: "A" },
        { name: "Encrypt drives", desc: "Use full disk encryption for all hard drives and storage media.", low: "—", moderate: "A", high: "A" },
        { name: "Prove encryption", desc: "Have a way to prove that media was encrypted after a loss of the hardware.", low: "—", moderate: "—", high: "Future A" },
        { name: "Encrypt in transit", desc: "Encrypt data transmitted across networks, following the Transmission of Sensitive Information Standard.", low: "—", moderate: "A", high: "A" }
      ]
    },
    {
      numeral: "VIII", id: "backups", title: "Backups",
      intro: "Establish backup and contingency plans to protect University Information.",
      note: "This is the minimum standard for security purposes — business or other needs may call for additional backup practices.",
      controls: [
        { name: "Regular backups", desc: "Use regular, automated backups covering a minimum 15 days (with system/database checkpoints back to 30 days) to protect against data loss, ransomware, and other risks.", low: "—", moderate: "—", high: "S" },
        { name: "Secured backups", desc: "Keep backups unavailable on any network to limit ransomware exposure (physical or logical “air gap”).", low: "—", moderate: "—", high: "S" },
        { name: "Test backups", desc: "Document and test the restore process at least annually.", low: "—", moderate: "—", high: "S" },
        { name: "Encrypt backups", desc: "Ensure backups are encrypted at rest and while being moved. File encryption may satisfy both.", low: "—", moderate: "—", high: "S" }
      ]
    },
    {
      numeral: "IX", id: "sessions", title: "Sessions",
      intro: "Secure application sessions, console access, and client connections.",
      controls: [
        { name: "Screen Lock", desc: "Endpoint devices with University data, or that access University systems, must use password/passcode/biometric/PIN access. Screen locks engage after 30 minutes idle.", low: "—", moderate: "—", high: "A" },
        { name: "Secure endpoints", desc: "Establish and enforce client device minimum requirements for connection to the application for other than self-service.", low: "—", moderate: "—", high: "July 2026 S" }
      ]
    },
    {
      numeral: "X", id: "software-development", title: "Software Development",
      intro: "Use a Secure Software Development Lifecycle (SDLC) to test and eliminate security vulnerabilities during development.",
      controls: [
        { name: "SDLC", desc: "Software development follows a defined Secure Software Development Lifecycle.", low: "—", moderate: "A", high: "A" },
        { name: "Test Software", desc: "SDLC includes security testing that can at minimum identify and resolve vulnerabilities on the OWASP Top 10 list.", low: "—", moderate: "—", high: "S" },
        { name: "OWASP lvl 1", desc: "SDLC addresses all topics in the OWASP Application Security Verification Standard (ASVS) v4.0.3 (or latest) at level 1. Third parties follow an equivalent framework.", low: "—", moderate: "July 2025 S", high: "July 2025 S" },
        { name: "OWASP lvl 2", desc: "SDLC addresses all topics in the OWASP ASVS v4.0.3 (or latest) at level 2. Third parties follow an equivalent framework.", low: "—", moderate: "—", high: "July 2026 S" }
      ]
    },
    {
      numeral: "XI", id: "change-management", title: "Change Management",
      intro: "Practice effective change management that analyzes the security impact of proposed changes and logs those changes.",
      note: "University and Unit Change Control Standards cover IT Change Management more broadly — make sure your practice includes these security requirements too.",
      controls: [
        { name: "Analyze security impact", desc: "The change control process includes an explicit analysis that identifies and addresses the security impact of a proposed change before implementation.", low: "—", moderate: "—", high: "A" },
        { name: "Control change", desc: "Control all system changes through a documented process.", low: "—", moderate: "—", high: "A" },
        { name: "Audit change", desc: "Generate an audit trail for all system changes.", low: "—", moderate: "—", high: "A" }
      ]
    },
    {
      numeral: "XII", id: "training", title: "Training",
      intro: "IT Service Providers train the people who use and administer their services on responsibilities and appropriate use. In shared-responsibility setups, clearly divide training duties.",
      controls: [
        { name: "Train everyone", desc: "Train every person who uses your system, appropriate to their privilege level, and repeat periodically.", low: "S", moderate: "S", high: "S" },
        { name: "Communicate responsibilities", desc: "Clearly convey intended use, responsibility, security, and compliance reminders to people using the system.", low: "—", moderate: "S", high: "S" },
        { name: "Administrator training", desc: "People responsible for services and multi-user systems must complete required administrator training. (Does not apply to personal devices.)", low: "—", moderate: "A", high: "A" }
      ]
    },
    {
      numeral: "XIII", id: "data-management", title: "Data Management",
      intro: "Units must have processes for routinely archiving, securely purging, and appropriately sharing data, and controls for temporary access during repair.",
      controls: [
        { name: "Expire data", desc: "Routinely remove sensitive data once it's no longer needed, per the University Records Retention and Disposition Schedule.", low: "—", moderate: "A", high: "A" },
        { name: "Control custody", desc: "Maintain a proper chain of custody for devices returning for re-use or disposal.", low: "—", moderate: "—", high: "Future A" },
        { name: "Disposal (University)", desc: "Properly dispose of any devices holding University data; ensure sensitive data is destroyed before a device exits chain of custody. Overwrite, cryptographic erase, or physical destruction.", low: "A", moderate: "A", high: "A" },
        { name: "Disposal (personal)", desc: "Ensure all Tier 2/3 University data is destroyed on personal devices when no longer used for University purposes, or when the owner changes roles.", low: "—", moderate: "A", high: "A" },
        { name: "Sanitize devices", desc: "Devices to be reused must be appropriately sanitized before repurposing.", low: "—", moderate: "A", high: "A" },
        { name: "Downstream use within UNC", desc: "Confirm internal data-sharing partners within the University understand their security obligations and currently meet them before sharing data.", low: "—", moderate: "S", high: "A" },
        { name: "Downstream use with third parties", desc: "Before setting up or renewing a third-party IT service relationship, confirm the third party meets required security standards and that this is bound by contract.", low: "—", moderate: "S", high: "A" },
        { name: "Step Down Data", desc: "Reduce data in use to match operational need; use anonymization and artificial data in Dev/Test. Step down volume, tier, and criticality to the minimum necessary.", low: "—", moderate: "—", high: "A" },
        { name: "Step up platform", desc: "Migrate data from less to more secure systems (e.g. laptop to network storage). Use protective archiving on more secure systems when retention exceeds operational need.", low: "—", moderate: "—", high: "A" }
      ]
    },
    {
      numeral: "XIV", id: "logs-monitoring", title: "Logs and Monitoring",
      intro: "Log, monitor, and retain security-relevant system and network events for incident detection, incident response, and compliance.",
      controls: [
        { name: "Time sync", desc: "Ensure correct time on system (use time servers to synchronize).", low: "—", moderate: "A", high: "A" },
        { name: "Log true client", desc: "Service logs adequately capture the “true” client IP address, not just a load balancer or proxy IP.", low: "S", moderate: "S", high: "S" },
        { name: "Log space", desc: "Maintain adequate space to keep 90 days of required security-relevant logs.", low: "—", moderate: "S", high: "S" },
        { name: "Log forwarding", desc: "Forward logs off the system/device to a log aggregation point.", low: "—", moderate: "S", high: "S" },
        { name: "Log aggregation retention", desc: "Retain logs sent to a log aggregation system for one year.", low: "—", moderate: "—", high: "S (future TBD)" },
        { name: "Traffic logs", desc: "Log all inbound and outbound allowed network traffic into the system’s security perimeter (timestamp, source/destination IP, protocol, port, duration, bytes). Doesn't apply to endpoints.", low: "—", moderate: "S", high: "S" },
        { name: "Auth logs", desc: "Log all successful and failed authorization events.", low: "A", moderate: "A", high: "A" },
        { name: "Privilege logs", desc: "Log all privileged actions.", low: "A", moderate: "A", high: "A" },
        { name: "Data access logs", desc: "Log access to Tier 3 data, correlated to a computer account, timestamp, and client IP address.", low: "—", moderate: "—", high: "A" },
        { name: "Error logs", desc: "Log OS and application errors.", low: "A", moderate: "A", high: "A" },
        { name: "Process logs", desc: "Log successful and failed process launches with timestamp and ID.", low: "—", moderate: "S", high: "A" },
        { name: "Provide logs", desc: "Promptly provide logs to ISO when requested for incident response or prevention.", low: "A", moderate: "A", high: "A" },
        { name: "Review logs", desc: "Review logs for suspicious behavior using a log monitoring and notification system.", low: "—", moderate: "—", high: "S" },
        { name: "Store logs", desc: "Store and protect log data using at least the Moderate protection set.", low: "—", moderate: "—", high: "S" },
        { name: "Log failures", desc: "Detect a logging failure the day it occurs and have a plan to correct logging failures.", low: "—", moderate: "—", high: "S" }
      ]
    },
    {
      numeral: "XV", id: "network-protection", title: "Network Protection and Intrusion Detection",
      intro: "Use network- and host-based protection and intrusion detection to inspect traffic, stop attacks, and alert for investigation.",
      controls: [
        { name: "Deny inbound", desc: "Set firewalls to deny-by-default inbound communications. Document approved exceptions.", low: "—", moderate: "S", high: "S" },
        { name: "Deny outbound", desc: "Set firewalls to deny-by-default outbound communications. Document approved exceptions.", low: "—", moderate: "—", high: "S" },
        { name: "Host intrusion detection", desc: "Use ISO-approved, University-provided host-based malware detection and intrusion prevention with central reporting to ISO. University-owned IT at Moderate; also personal IT at High.", low: "—", moderate: "A", high: "A" },
        { name: "Network Intrusion detection", desc: "Ensure your service/device is protected by University-provided network intrusion detection/prevention with central reporting (or an equivalent for third parties/non-University networks).", low: "—", moderate: "S", high: "S" }
      ]
    },
    {
      numeral: "XVI", id: "incident-reporting", title: "Incident Reporting",
      intro: "Follow the Information Security Incident Standard and be familiar with other reporting procedures. These apply at every protection level.",
      noLevels: true,
      controls: [
        { name: "Incident downtime", desc: "Expect downtime in case of a security incident. See the University Business Continuity Procedure." },
        { name: "Report events", desc: "Promptly report security events to the Information Security Office the same day you suspect them. Third parties must be contractually bound to report incidents to ISO too." },
        { name: "Self-investigation", desc: "Do not self-investigate. Security events must be investigated only by ISO and those ISO certifies and designates." },
        { name: "Follow incident direction", desc: "Follow ISO's direction on all actions throughout the incident — technology actions plus internal and external communications." },
        { name: "Participate in response", desc: "Follow all stages of handling and responding to the incident, including the After Action Review and any resulting risk treatment plans." }
      ]
    },
    {
      numeral: "XVII", id: "incident-management", title: "Incident Management",
      intro: "ISO, the Institutional Privacy Office, Emergency Management, and third-party organization authorities build incident response plans and support IT Incident Response capabilities. Applies only to campus and third-party authorities responsible for managing Information Security and related incident types.",
      noLevels: true,
      controls: [
        { name: "Document plans", desc: "Document incident response plans using an industry-standard IR template with phases (e.g. “analyze,” “contain,” “eradicate,” “recover”)." },
        { name: "Test IR plan", desc: "The organization's designated authority tests the IR plan at least annually." },
        { name: "Select Tools", desc: "Select, implement, and manage tools to carry out all required security detection and response actions." }
      ]
    },
    {
      numeral: "XVIII", id: "individuals", title: "Controls That Apply to Individuals",
      intro: "These apply to each person who interacts with University IT, regardless of the devices, systems, or services you use.",
      noLevels: true,
      controls: [
        { name: "Password sharing", desc: "Do not share your individual account credentials. Comply with the Acceptable Use and Onyen policies." },
        { name: "Default passwords", desc: "Do not use default passwords for any accounts." },
        { name: "Required training", desc: "Complete your annual IT security training and any other training required for your specific responsibilities (HIPAA, FERPA, etc.)." },
        { name: "Control devices", desc: "Control the devices in your care, including personal devices holding University Data — including public records/eDiscovery obligations and secure disposal when you're no longer authorized to have the data." },
        { name: "Protect data", desc: "Follow University storage guidance for data. Match the protection level to your Tier 2/3 information. Don't leave sensitive data visible on unattended desks or screens, publish it, or share it with unauthorized people. Use only applications confirmed to meet the proper protection level." },
        { name: "Use VPN", desc: "Use a University-provided VPN for access to high-risk systems that require it. Don't circumvent VPN or other controls — remote desktop to an on-campus device is not a valid alternative." },
        { name: "Protect network", desc: "Do not bridge or otherwise compromise network security perimeters, or attach systems to controlled segments without permission." },
        { name: "Contract Protections", desc: "Bind third parties by contract to security measures equivalent to this Standard whenever the University has a Moderate or greater protection obligation." },
        { name: "Travel Protections", desc: "Before international travel, get guidance on what data and technology may safely and legally travel with you. Consult the University Export Controls Office." }
      ]
    }
  ],

  overlays: [
    {
      id: "hipaa", title: "HIPAA",
      full: "Health Information Portability and Accountability Act",
      summary: "Systems handling PHI must use the High baseline, plus HIPAA-specific overlay controls.",
      details: [
        "Fully take part in a biannual HIPAA Security Risk Assessment (HSRA), with University-approved plans and dates to fix anything it finds.",
        "Report PHI-related risks that aren't clearly covered by policy promptly to the Information Security Office.",
        "Remove PHI access promptly when someone's authorization ends; re-authorize access when a role changes.",
        "Keep your unit's Tarheel Mission Ready Plan current and periodically tested.",
        "All workforce members complete annual HIPAA training; new members within 90 days.",
        "EMR systems handling clinical data must use the University's security/privacy log monitoring program (future date July 1, 2025); logs transmitted near real-time to the University log aggregation system (future date TBD).",
        "Restrict PHI access with technical controls to Business Associates and workforce with a need to know; have a Business Associate Agreement (or equivalent) with third parties.",
        "House each system/service/device in a physically secured location.",
        "Workforce access to PHI requires Onyen authentication through University SSO; ISO must review/approve any other authentication scheme.",
        "Complete an independent penetration test of covered systems at least every three years (requirement begins January 1, 2026)."
      ]
    },
    {
      id: "ferpa", title: "FERPA",
      full: "Family Educational Rights and Privacy Act of 1974",
      summary: "Implement the Moderate controls baseline and follow the University's FERPA Policy.",
      details: ["Protects student education records. Most Business School course and advising systems that touch student records should plan for at least the Moderate baseline for this reason alone."]
    },
    {
      id: "pci", title: "PCI-DSS",
      full: "Payment Card Industry Data Security Standard",
      summary: "Before accepting card transactions or using PCI data, complete the CERTIFI process and fully implement PCI DSS.",
      details: ["Ensures baseline High controls are in place, along with other PCI requirements.", "Relevant to any Business School event, program, or store that takes payment cards."]
    },
    {
      id: "dod", title: "DoD Contract",
      full: "Department of Defense Contract",
      summary: "University activities under a DoD contract have specific security requirements and must run in a secure, ISO-approved computing enclave.",
      details: [
        "Apply at least all High Protection security controls in this Standard within the enclave.",
        "Obtain ISO approval of a System Security Plan (SSP) and plans of action and milestones (POA&M)."
      ]
    },
    {
      id: "cjis", title: "CJIS",
      full: "Criminal Justice Information Systems",
      summary: "Implement the High Protection control set, plus CJIS-specific requirements.",
      details: ["Coordinate staffing with the University Chief of Police.", "Require a fingerprint-based background check for staff supporting CJIS systems."]
    },
    {
      id: "critical-infrastructure", title: "Critical Infrastructure",
      summary: "Needs custom security planning beyond a standard control set.",
      details: [
        "Once the CISO designates a system or service Critical IT Infrastructure, the Responsible Person must create and maintain a three-year security plan.",
        "The security plan must be registered with the Information Security Office, which may require changes."
      ]
    },
    {
      id: "high-availability", title: "High Availability",
      summary: "An optional overlay a unit can apply at its discretion when business continuity needs demand it.",
      details: [
        "Business Continuity planning is outside the scope of Information Security; High Availability itself is not addressed by this Standard's technology engineering requirements.",
        "If BC planning shows a system must be highly available, consider raising its security protection baseline (e.g. Low → Moderate or High).",
        "Recommended environmental controls: fire detection/suppression, temperature & humidity control, emergency lighting, water damage protection, emergency power/shutoff, 24/7 automated monitoring with escalating alerts, change rollback planning.",
        "Keep backups in a different physical location from the systems they protect, and document/test the restore process at least annually."
      ]
    },
    {
      id: "pending", title: "Pending Overlays",
      summary: "Contact the ISO for help if you must meet obligations under any of these frameworks — overlays are still being finalized.",
      details: ["CMMC Level 1", "CMMC Level 2", "NIST 800-53 (NCDIT)", "NIST 800-53 Moderate (Full)", "NIST 800-171", "CPHS", "CMS ARS"]
    }
  ],

  exceptions: {
    intro: "If a Responsible Person finds a control they can't meet, there are two options: implement it immediately, or formally accept the risk. Risk acceptance needs documented, scaled approval:",
    table: [
      { level: "Low", approvals: "May require unit approval", documentation: "Unit discretion" },
      { level: "Moderate", approvals: "Must obtain unit approval", documentation: "Unit discretion" },
      { level: "High", approvals: "Must obtain unit approval and ISO approval", documentation: "Written explanation of the reason, with written approval from approving groups" },
      { level: "External obligations mapped to High", approvals: "Same as High", documentation: "Same as High" }
    ],
    notes: [
      "Each Accountable Person must run an exception review process for their unit: criteria balancing risk with mission goals, a way to receive/decide/document requests, routing of approved High-level and external-obligation exceptions to ISO, and a registered delegate who runs the process.",
      "If ISO rejects an exception request, the Responsible Person may appeal to the University CIO.",
      "“Approved blanket exceptions” are pre-decided alternative controls documented in the Standard itself — these don't need the extra approval a normal exception requires, e.g. VDI access to Sensitive Information can stand in for endpoint encryption, and strong physical security plus media-destruction controls can stand in for full disk encryption on a single-purpose, non-Internet-facing host."
    ]
  },

  timeline: [
    { date: "Until Jan 1, 2026", text: "Units and Responsible Persons may opt to use either the previous Information Security Controls Standard (2020) or this current Standard." },
    { date: "Jan 1, 2026", text: "New technology is governed by this version. On this date, new systems must follow this Standard's MFA control; existing systems update to it at ISO's direction." },
    { date: "Jul 1, 2027", text: "This version (or a later revision) is fully applicable to all University IT systems, other than items in the Standard with their own future dates." }
  ],

  resources: {
    emergency: "If you're experiencing a security event or suspect a data breach, call 919-962-4357 (HELP) and ask for a security Incident Handler.",
    links: [
      { label: "safecomputing.unc.edu", note: "Examples, guidance, and more detail on every control" },
      { label: "help.unc.edu", note: "ITS Policy Office and University Information Security Office" },
      { label: "datagov.unc.edu", note: "University Data Governance Standard" }
    ]
  }
};
