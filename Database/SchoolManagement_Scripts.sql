IF NOT EXISTS (SELECT name FROM master.sys.databases WHERE name = N'school_management_sqldb')
BEGIN
    CREATE DATABASE school_management_sqldb;
END;
GO

USE school_management_sqldb;
GO

CREATE TABLE Campuses (
    CampusId INT PRIMARY KEY IDENTITY,
    CampusName NVARCHAR(100),
    Address NVARCHAR(255),
    City NVARCHAR(100),
    State NVARCHAR(100),
    Country NVARCHAR(100),
    PostalCode NVARCHAR(20),
    PhoneNumber NVARCHAR(15),
    Email NVARCHAR(100),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1
);

CREATE TABLE Departments (
    DepartmentId INT PRIMARY KEY IDENTITY,
    CampusId INT,
    DepartmentName NVARCHAR(100),
    Description NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1
    FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId)
);
---------- User Access Control ----------

CREATE TABLE UserRoles (
    RoleId INT PRIMARY KEY IDENTITY,
    RoleName NVARCHAR(50), -- Admin, Teacher, Parent, etc.
    RoleDescription NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT NULL,
	IsActive BIT DEFAULT 1
);

CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(50) UNIQUE,
    PasswordHash NVARCHAR(255),
    RoleId INT,
	CampusId INT, 
    IsActive BIT DEFAULT 1,
	CreatedAt DATETIME DEFAULT GETDATE(),
	UpdatedAt DATETIME NULL,

	FOREIGN KEY (RoleId) REFERENCES UserRoles(RoleId),
	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
);

CREATE TABLE UserPermissions (
    PermissionId INT PRIMARY KEY IDENTITY,
    RoleId INT,
	UserId INT,
    Entity NVARCHAR(50), -- Students, Courses, etc.
    CanCreate BIT,
    CanRead BIT,
    CanUpdate BIT,
    CanDelete BIT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (RoleId) REFERENCES UserRoles(RoleId),
	FOREIGN KEY (UserId) REFERENCES Users(UserId),
);
CREATE INDEX IDX_Permissions_RoleId ON UserPermissions(RoleId);

---------- Class Management ----------

CREATE TABLE Classrooms (
    ClassroomId INT PRIMARY KEY IDENTITY,
	CampusId INT,
    RoomNumber NVARCHAR(20),
    Building NVARCHAR(100),
    Capacity INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE ClassroomAssignments (
    AssignmentId INT PRIMARY KEY IDENTITY,
    ClassroomId INT,
    CampusId INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1
    
    FOREIGN KEY (ClassroomId) REFERENCES Classrooms(ClassroomId),
    FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);
CREATE INDEX ClassroomAssignments_CampusId ON ClassroomAssignments(CampusId);

CREATE TABLE Classes (
    ClassId INT PRIMARY KEY IDENTITY,
    ClassName NVARCHAR(50) UNIQUE,
    ClassDescription NVARCHAR(255),
	Capacity INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE ClassCampusAssignments (
    AssignmentId INT PRIMARY KEY IDENTITY,
    ClassId INT,
    CampusId INT,

	UNIQUE (ClassId, CampusId),  -- Ensure a class is uniquely assigned to a campus

    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
);
CREATE INDEX IDX_ClassCampusAssignments_ClassId ON ClassCampusAssignments(ClassId);
CREATE INDEX IDX_ClassCampusAssignments_CampusId ON ClassCampusAssignments(CampusId)

CREATE TABLE Sections (
    SectionId INT PRIMARY KEY IDENTITY,
    SectionName NVARCHAR(50),
	ClassId INT,
	Capacity INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	UNIQUE (ClassId, SectionName) -- Ensure unique section names within a class

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
);

CREATE TABLE ClassSectionAssignments (
    AssignmentId INT PRIMARY KEY IDENTITY,
    ClassId INT,
    SectionId INT,
    ClassroomId INT,
	CampusId INT,
	Capacity INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
    FOREIGN KEY (SectionId) REFERENCES Sections(SectionId),
    FOREIGN KEY (ClassroomId) REFERENCES Classrooms(ClassroomId),
);
CREATE INDEX IDX_ClassSectionAssignments_ClassId ON ClassSectionAssignments(ClassId);
CREATE INDEX IDX_ClassSectionAssignments_SectionId ON ClassSectionAssignments(SectionId);
CREATE INDEX IDX_ClassSectionAssignments_ClassroomId ON ClassSectionAssignments(ClassroomId);


---------- Admission Management ----------

CREATE TABLE Applicants (
    ApplicantId INT PRIMARY KEY IDENTITY,
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
	FormBNumber NVARCHAR(15) NULL,
    DateOfBirth DATE,
    Gender NVARCHAR(10),
    --Email NVARCHAR(100) UNIQUE,
    --PhoneNumber NVARCHAR(15),
    --ApplicantAddress NVARCHAR(255),
    --Nationality NVARCHAR(50),
    ApplicationDate DATE DEFAULT GETDATE(),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE Applications (
    ApplicationId INT PRIMARY KEY IDENTITY,
    ApplicantId INT,
	CampusId INT,
    AppliedClassId INT,
	LastClassId INT NULL,
    ApplicationStatus NVARCHAR(50),  -- e.g., "Pending", "Approved", "Rejected"
    AdmissionDecisionDate DATE NULL,
    Remarks NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (ApplicantId) REFERENCES Applicants(ApplicantId),
	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (AppliedClassId) REFERENCES Classes(ClassId),
	FOREIGN KEY (LastClassId) REFERENCES Classes(ClassId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);
CREATE INDEX IDX_Applications_ApplicantId ON Applications(ApplicantId);

CREATE TABLE AdmissionTests (
    TestId INT PRIMARY KEY IDENTITY,
    ApplicationId INT,
    TestDate DATE,
    TestScore DECIMAL(5,2),
    TestResult NVARCHAR(50),  -- e.g., "Pass", "Fail"
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ApplicationId) REFERENCES Applications(ApplicationId),
);
CREATE INDEX IDX_AdmissionTests_ApplicationId ON AdmissionTests(ApplicationId)

CREATE TABLE Students (
    StudentId INT PRIMARY KEY IDENTITY,
    GrNo INT,
	FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    DateOfBirth DATE,
    Gender NVARCHAR(10),
    EnrollmentDate DATE,
    ProfileImage NVARCHAR(255) NULL,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	UNIQUE (GrNo), -- Ensure unique Gr. No.

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE Admissions (
    AdmissionId INT PRIMARY KEY IDENTITY,
    StudentId INT,
    ApplicationId INT,
    AdmissionDate DATE,
    ClassId INT,
    SectionId INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	UNIQUE (StudentId, ApplicationId),  -- Ensure unique mapping between student and application

    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    FOREIGN KEY (ApplicationId) REFERENCES Applications(ApplicationId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (SectionId) REFERENCES Sections(SectionId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);
CREATE INDEX IDX_Admissions_StudentId ON Admissions(StudentId)

CREATE TABLE StudentAcademic (
    StudentAcademicId INT PRIMARY KEY IDENTITY,
    StudentId INT,
	CampusId INT,
    ClassId INT,
    SectionId INT,
	AcademicYear NVARCHAR(10),  -- e.g., "2024-2025"
    IsPromoted BIT DEFAULT 0,
    PromotionDate DATETime Default GetDate() NULL,
    Remarks NVARCHAR(255) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    UpdatedBy INT,
    IsActive BIT DEFAULT 1, 
	IsStudied BIT Default 0 Null,
	-- Flag to indicate if this is the student's current enrollment

    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (SectionId) REFERENCES Sections(SectionId),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId)
);
CREATE INDEX IDX_StudentAcademicRecords_StudentId ON StudentAcademic(StudentId);
CREATE INDEX IDX_StudentAcademicRecords_ClassId ON StudentAcademic(ClassId);
CREATE INDEX IDX_StudentAcademicRecords_SectionId ON StudentAcademic(SectionId);
CREATE INDEX IDX_StudentAcademicRecords_AcademicYear ON StudentAcademic(AcademicYear);

CREATE TABLE StudentAttendance (
    AttendanceId INT PRIMARY KEY IDENTITY(1,1),
    StudentId INT,
	ClassId INT,
    SectionId INT,
    AttendanceDate DATE,
    AttendanceStatus NVARCHAR(20),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
	FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (SectionId) REFERENCES Sections(SectionId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);
CREATE INDEX IDX_StudentAttendance_StudentId ON StudentAttendance(StudentId);
CREATE INDEX IDX_StudentAttendance_ClassId ON StudentAttendance(ClassId);
CREATE INDEX IDX_StudentAttendance_SectionId ON StudentAttendance(SectionId);

--------- Employees ----------

CREATE TABLE EmployeeRoles (
    RoleId INT PRIMARY KEY IDENTITY,
    RoleName NVARCHAR(50) UNIQUE,  -- e.g., "Teacher", "Administrator", "Accountant"
    RoleDescription NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE Employees (
    EmployeeId INT PRIMARY KEY IDENTITY,
    RoleId INT,  -- Foreign key to EmployeeRoles table
	CampusId INT,
    DepartmentId INT,
	FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Email NVARCHAR(100) UNIQUE,
    PhoneNumber NVARCHAR(15),
    HireDate DATE,
    Department NVARCHAR(50), -- Optional: can specify a department if needed
    [Address] NVARCHAR(255),
    EmergencyContact NVARCHAR(50),
    Qualifications NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    UpdatedBy INT,
    IsActive BIT DEFAULT 1,

	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
    FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId),
    FOREIGN KEY (RoleId) REFERENCES EmployeeRoles(RoleId),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId)
);
CREATE INDEX IDX_Employees_RoleId ON Employees(RoleId);

CREATE TABLE EmployeeAttendance (
    EmployeeAttendanceId INT PRIMARY KEY IDENTITY(1,1),
    EmployeeId INT,
    AttendanceDate DATE Default GetDate(),
    AttendanceStatus NVARCHAR(20),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT Null,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT Null,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);
CREATE INDEX IDX_EmployeeAttendance_EmployeeId ON EmployeeAttendance(EmployeeId);

CREATE TABLE EmployeeLeaves (
    LeaveId INT PRIMARY KEY IDENTITY,
    EmployeeId INT,
    LeaveType NVARCHAR(50), -- e.g., "Sick", "Casual", "Maternity"
    StartDate DATE,
    EndDate DATE,
	Reason NVARCHAR(255),
    ApprovalStatus NVARCHAR(20), -- e.g., "Pending", "Approved", "Rejected"
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    UpdatedBy INT,
    IsActive BIT DEFAULT 1,

    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId)
);
CREATE INDEX IDX_EmployeeLeaves_EmployeeId ON EmployeeLeaves(EmployeeId);

CREATE TABLE PerformanceAppraisals (
    AppraisalId INT PRIMARY KEY IDENTITY,
    EmployeeId INT,
    AppraisalDate DATE,
    PerformanceScore INT,
    Comments NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId)
);
CREATE INDEX IDX_PerformanceAppraisals_EmployeeId ON PerformanceAppraisals(EmployeeId);

CREATE TABLE Trainings (
    TrainingId INT PRIMARY KEY IDENTITY,
    EmployeeId INT,
    TrainingName NVARCHAR(100),
    TrainingDate DATE,
    Certification NVARCHAR(50),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId)
);
CREATE INDEX IDX_Trainings_EmployeeId ON Trainings(EmployeeId);

CREATE TABLE Benefits (
    BenefitId INT PRIMARY KEY IDENTITY,
    EmployeeId INT,
    BenefitType NVARCHAR(50), -- e.g., "Health Insurance", "Retirement Plan"
    Description NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId)
);
CREATE INDEX IDX_Benefits_EmployeeId ON Benefits(EmployeeId);

--------- Payrolls ----------

CREATE TABLE Allowances (
    AllowanceId INT PRIMARY KEY IDENTITY,
    EmployeeId INT,
    AllowanceType NVARCHAR(50), -- e.g., "Housing", "Transport"
    Amount DECIMAL(10,2),
    [Month] DATE, -- To record the month and year of the allowance
    
	FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId)
);
CREATE INDEX IDX_Allowances_EmployeeId ON Allowances(EmployeeId);

CREATE TABLE Bonuses (
    BonusId INT PRIMARY KEY IDENTITY,
    EmployeeId INT,
    BonusType NVARCHAR(50), -- e.g., "Performance", "Annual"
    Amount DECIMAL(10,2),
    [Month] DATE, -- To record the month and year of the bonus
    
	FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId)
);
CREATE INDEX IDX_Bonuses_EmployeeId ON Bonuses(EmployeeId);

CREATE TABLE Payroll (
    PayrollId INT PRIMARY KEY IDENTITY,
    EmployeeId INT,
    BasicSalary DECIMAL(10,2),
    Allowances DECIMAL(10,2) DEFAULT 0,
    Bonus DECIMAL(10,2) DEFAULT 0,
    Deductions DECIMAL(10,2) DEFAULT 0,
    NetPay DECIMAL(10,2),
    PaymentDate DATE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    UpdatedBy INT,
    IsActive BIT DEFAULT 1,

    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId)
);
CREATE INDEX IDX_Payroll_EmployeeId ON Payroll(EmployeeId);

---------- Subject Management ----------

CREATE TABLE Subjects (
    SubjectId INT PRIMARY KEY IDENTITY,
    SubjectName NVARCHAR(100) UNIQUE,
    SubjectDescription NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE ClassSubjects (
    ClassSubjectId INT PRIMARY KEY IDENTITY,
    ClassId INT,
    SubjectId INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	UNIQUE (ClassId, SubjectId) -- Ensure unique subjects within a class

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId),
);

CREATE TABLE SubjectTeachers (
    SubjectTeacherId INT PRIMARY KEY IDENTITY,
    SubjectId INT,
    EmployeeId INT,
    TeacherRole NVARCHAR(50), -- e.g., "Lead Instructor", "Assistant Instructor"
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId),
    FOREIGN KEY (EmployeeId) REFERENCES Employees(EmployeeId),
);
CREATE INDEX IDX_SubjectTeachers_SubjectId ON SubjectTeachers(SubjectId);
CREATE INDEX IDX_SubjectTeachers_EmployeeId ON SubjectTeachers(EmployeeId);

CREATE TABLE [Periods] (
    PeriodId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    PeriodName NVARCHAR(50) NULL,
    StartTime TIME(7) NULL,
    EndTime TIME(7) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    UpdatedAt DATETIME NULL,
    UpdatedBy INT,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId)
);


CREATE TABLE Timetables (
    TimetableId INT PRIMARY KEY IDENTITY,
	CampusId INT,
    SubjectId INT,
	ClassId INT,
	PeriodId INT,
    DayOfWeek NVARCHAR(10),
    StartTime TIME,
    EndTime TIME,
    ClassroomId INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
	FOREIGN KEY (PeriodId) REFERENCES [Periods](PeriodId),
	FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId),
	FOREIGN KEY (ClassroomId) REFERENCES Classrooms(ClassroomId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    
    
);
CREATE INDEX IDX_Timetables_CampusId ON Campuses(CampusId);
CREATE INDEX IDX_Timetables_ClassId ON Classes(ClassId);
CREATE INDEX IDX_Timetables_PeriodId ON Periods(PeriodId);
CREATE INDEX IDX_Timetables_SubjectId ON Timetables(SubjectId);
CREATE INDEX IDX_Timetables_ClassroomId ON Timetables(ClassroomId);

---------- Exam Management ----------

CREATE TABLE QuestionsBank (
    QuestionBankId INT PRIMARY KEY IDENTITY,
    ClassId INT,
	SubjectId INT,
	QuestionType NVARCHAR(50),
	Questions NVARCHAR(255),
	Marks INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1
    
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
	FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId)
);

CREATE TABLE ExamPaper (
    ExamPaperId INT PRIMARY KEY IDENTITY,
	ClassId INT,
    SubjectId INT,
	QuestionId INT,
	TotalMarks INT,
	TermName NVARCHAR(30),
	WrittenMarks INT,
	DictationMarks INT,
	OralMarks INT,
	CopyMarks INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
	FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId),
	FOREIGN KEY (QuestionId) REFERENCES QuestionsBank(QuestionBankId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE Exams (
    ExamId INT PRIMARY KEY IDENTITY,
	CampusId INT,
    SubjectId INT,
    ClassId INT,
	ExamPaperId INT,
    ExamDate DATE,
    StartTime TIME,
    EndTime TIME,
    ExamLocation NVARCHAR(100),
    ExamType NVARCHAR(20),  -- e.g., "Weekly", "Monthly", "Quarterly", "Mid", "Yearly"
    TotalMarks INT,
    PassingMarks INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (ExamPaperId) REFERENCES ExamPaper(ExamPaperId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
);
CREATE INDEX IDX_Exams_CampusId ON Exams(CampusId);
CREATE INDEX IDX_Exams_SubjectId ON Exams(SubjectId);
CREATE INDEX IDX_Exams_ClassId ON Exams(ClassId);

CREATE TABLE ExamResults (
    ExamResultId INT PRIMARY KEY IDENTITY,
    StudentId INT,
	MarksObtained INT,
	ExamPaperId INT,
    ExamId INT,
    Score DECIMAL(5,2),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (ExamPaperId) REFERENCES ExamPaper(ExamPaperId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    FOREIGN KEY (ExamId) REFERENCES Exams(ExamId),
);
CREATE INDEX IDX_ExamResults_StudentId ON ExamResults(StudentId);
CREATE INDEX IDX_ExamResults_ExamId ON ExamResults(ExamId);

CREATE TABLE Grades (
    GradeId INT PRIMARY KEY IDENTITY(1,1),
    StudentId INT,
	SubjectId INT,
    GradeName NVARCHAR(5),
    DateAwarded DATE,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (SubjectId) REFERENCES Subjects(SubjectId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
);
CREATE INDEX IDX_Grades_SubjectId ON Grades(SubjectId);
CREATE INDEX IDX_Grades_StudentId ON Grades(StudentId);

CREATE TABLE Transcripts (
    TranscriptId INT PRIMARY KEY IDENTITY,
    StudentId INT,
    IssuedDate DATE,
    FilePath NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
);
CREATE INDEX IDX_Transcripts_StudentId ON Transcripts(StudentId);

---------- Sponsor Management ----------

CREATE TABLE Sponsors (
    SponsorId INT PRIMARY KEY IDENTITY,
    SponsorName NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    PhoneNumber NVARCHAR(15),
	Gender VARCHAR(10),
    Occupation VARCHAR(100),
    Nationality VARCHAR(50),
    Country VARCHAR(70),
    State VARCHAR(50),
    City VARCHAR(100),
    PostalCode INT,  
    Address VARCHAR(250),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE Sponsorships (
  SponsorshipId INT PRIMARY KEY IDENTITY,
  SponsorId INT,
  Amount DECIMAL(10,2),
	Frequency VARCHAR(50),
	StartDate Date,
  Schedule NVARCHAR(50), -- Monthly, Quarterly, etc.
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (SponsorId) REFERENCES Sponsors(SponsorId),
);
CREATE INDEX IDX_Sponsorships_SponsorId ON Sponsorships(SponsorId);

CREATE TABLE SponsorPayments (
    PaymentId INT PRIMARY KEY IDENTITY,
    SponsorshipId INT,
    PaymentDate DATE,
    AmountPaid DECIMAL(10,2),
    PaymentMethod NVARCHAR(50), -- e.g., Credit Card, Bank Transfer
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (SponsorshipId) REFERENCES Sponsorships(SponsorshipId),
);
CREATE INDEX IDX_Payments_SponsorshipId ON SponsorPayments(SponsorshipId)

---------- Fees Management ----------

CREATE TABLE FeeCategories (
    FeeCategoryId INT PRIMARY KEY IDENTITY,
    FeeName NVARCHAR(50), -- Tuition, Computer Lab, Transportation, Annual 
    FeeDescription NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE ClassFees (
    ClassFeeId INT PRIMARY KEY IDENTITY,
    ClassId INT,
    FeeCategoryId INT,
	CampusId INT,
    Amount DECIMAL(10, 2),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	UNIQUE (ClassId, FeeCategoryId) -- Ensure unique fee category for each class

	FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (FeeCategoryId) REFERENCES FeeCategories(FeeCategoryId),
	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    
);

CREATE TABLE StudentFees (
    StudentFeeId INT PRIMARY KEY IDENTITY,
    StudentId INT,
    ClassFeeId INT,
	CampusId INT,
    DiscountPercentage DECIMAL(5, 2) DEFAULT 0, -- Discount percentage
    SponsorId INT NULL,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    FOREIGN KEY (ClassFeeId) REFERENCES ClassFees(ClassFeeId),
    FOREIGN KEY (SponsorId) REFERENCES Sponsors(SponsorId)
);

CREATE TABLE FeeVouchers (
    VoucherId INT PRIMARY KEY IDENTITY,
    StudentId INT,
	CampusId INT,
    FeeMonth NVARCHAR(10), -- e.g., "January"
    FeeYear INT,
    TotalAmount DECIMAL(10, 2),
    DueDate DATE,
    Paid BIT DEFAULT 0,
    PaymentDate DATE NULL,
	LateFee DECIMAL(10, 2) DEFAULT 0,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	UNIQUE (StudentId, FeeMonth, FeeYear), -- Ensure one voucher per month per student

	FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
	FOREIGN KEY (CampusId) REFERENCES Campuses(CampusId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);
CREATE INDEX IDX_FeeVouchers_StudentId ON FeeVouchers(StudentId);

CREATE TABLE FeeVoucherPayments (
    PaymentId INT PRIMARY KEY IDENTITY,
    VoucherId INT,
    PaymentAmount DECIMAL(10, 2),
    PaymentDate DATE,
    PaymentMethod NVARCHAR(50), -- e.g., "Credit Card", "Bank Transfer"
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (VoucherId) REFERENCES FeeVouchers(VoucherId),
);
CREATE INDEX IDX_Payments_VoucherId ON FeeVoucherPayments(VoucherId);

CREATE TABLE FeeAdjustments (
    AdjustmentId INT PRIMARY KEY IDENTITY,
    StudentId INT,
    VoucherId INT,
    AdjustmentAmount DECIMAL(10, 2),
    Reason NVARCHAR(255),
    AdjustmentDate DATE,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    FOREIGN KEY (VoucherId) REFERENCES FeeVouchers(VoucherId)
);

---------- Parent Management ----------

CREATE TABLE Parents (
    ParentId INT PRIMARY KEY IDENTITY,
    FirstName NVARCHAR(50) Null,
	MiddleName NVARCHAR(50) Null,
	LastName NVARCHAR(50) Null,
	MotherTongue NVARCHAR(50) Null,
    Email NVARCHAR(100) UNIQUE,
    PhoneNumber NVARCHAR(15) Null,
    SourceOfIncome Nvarchar(50) Null,
	[Dependent] NvarChar (50) Null,
    Occupation nvarchar (50) null,
    Nationality Nvarchar (50) null,
    ResidenceStatus Nvarchar (50)Null, 
    ParentAddress NVARCHAR(255) Null,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT Null,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT Null,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE StudentParent (
    StudentParentId INT PRIMARY KEY IDENTITY,
    StudentId INT Null,
	ApplicantId Int Null,
    ParentId INT,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT Null,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    FOREIGN KEY (ParentId) REFERENCES Parents(ParentId),
    FOREIGN KEY (ApplicantId) REFERENCES Applicants(ApplicantId),
);
--CREATE INDEX IDX_StudentParent_StudentId ON Students(StudentId);

CREATE TABLE ParentFeedback (
    ParentFeedbackId INT PRIMARY KEY IDENTITY,
    ParentId INT,
    StudentId INT,
    FeedbackText NVARCHAR(MAX),
    DateSubmitted DATE,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ParentId) REFERENCES Parents(ParentId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
);
CREATE INDEX IDX_ParentFeedback_ParentId ON ParentFeedback(ParentId)

---------- Notification ----------

CREATE TABLE Notifications (
    NotificationId INT PRIMARY KEY IDENTITY,
    UserId INT,
    UserType NVARCHAR(50), -- Student, Teacher, Parent, etc.
    NotifyMessage NVARCHAR(255),
    DateSent DATE,
    SentVia NVARCHAR(50), -- Email, SMS
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE EmailLogs (
    EmailLogId INT PRIMARY KEY IDENTITY,
    Recipient NVARCHAR(100),
    EmailSubject NVARCHAR(255),
    Body NVARCHAR(MAX),
    DateSent DATE,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);


---------- Accounting Systems ----------

-- FiscalYear Table
CREATE TABLE FiscalYears (
    FiscalYearId INT PRIMARY KEY IDENTITY,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    FiscalYearName NVARCHAR(20), -- e.g., "2024-2025"
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    UpdatedAt DATETIME NULL,
    UpdatedBy INT,

    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId)
);

-- Ledger Accounts Table
CREATE TABLE LedgerAccounts (
    AccountId INT PRIMARY KEY IDENTITY,
    AccountCode NVARCHAR(20) UNIQUE,
    AccountName NVARCHAR(100),
    AccountType NVARCHAR(50), -- e.g., "Asset", "Liability", "Income", "Expense"
    ParentAccountId INT NULL, -- Self-referencing for sub-accounts
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (ParentAccountId) REFERENCES LedgerAccounts(AccountId)
);

-- Journal Entries Table
CREATE TABLE JournalEntries (
    JournalEntryId INT PRIMARY KEY IDENTITY,
	FiscalYearId INT,
    EntryDate DATE,
    EntryDescription NVARCHAR(255),
    Posted BIT DEFAULT 0,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (FiscalYearId) REFERENCES FiscalYears(FiscalYearId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

-- Journal Entry Details Table
CREATE TABLE JournalEntryDetails (
    EntryDetailId INT PRIMARY KEY IDENTITY,
    JournalEntryId INT,
    AccountId INT,
    DebitAmount DECIMAL(10, 2) DEFAULT 0,
    CreditAmount DECIMAL(10, 2) DEFAULT 0,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (JournalEntryId) REFERENCES JournalEntries(JournalEntryId),
    FOREIGN KEY (AccountId) REFERENCES LedgerAccounts(AccountId)
);
CREATE INDEX IDX_JournalEntryDetails_AccountId ON JournalEntryDetails(AccountId);

-- Vouchers Table
CREATE TABLE Vouchers (
    VoucherId INT PRIMARY KEY IDENTITY,
	FiscalYearId INT,
    VoucherType NVARCHAR(50), -- e.g., "Payment", "Receipt", "Journal"
    VoucherNumber NVARCHAR(50),
    VoucherDate DATE,
    VoucherDescription NVARCHAR(255),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (FiscalYearId) REFERENCES FiscalYears(FiscalYearId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

-- Voucher Entries Table
CREATE TABLE VoucherEntries (
    VoucherEntryId INT PRIMARY KEY IDENTITY,
    VoucherId INT,
    AccountId INT,
    DebitAmount DECIMAL(10, 2) DEFAULT 0,
    CreditAmount DECIMAL(10, 2) DEFAULT 0,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (VoucherId) REFERENCES Vouchers(VoucherId),
    FOREIGN KEY (AccountId) REFERENCES LedgerAccounts(AccountId)
);
CREATE INDEX IDX_VoucherEntries_AccountId ON VoucherEntries(AccountId);

-- Budgets Table
CREATE TABLE Budgets (
    BudgetId INT PRIMARY KEY IDENTITY,
	FiscalYearId INT,
    AccountId INT,
    BudgetPeriod NVARCHAR(20), -- e.g., "2024-Q1"
    BudgetAmount DECIMAL(10, 2),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (FiscalYearId) REFERENCES FiscalYears(FiscalYearId),
	FOREIGN KEY (AccountId) REFERENCES LedgerAccounts(AccountId),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
    
);

-- Currency Support Table
CREATE TABLE Currencies (
    CurrencyId INT PRIMARY KEY IDENTITY,
    CurrencyCode NVARCHAR(10) UNIQUE,
    CurrencyName NVARCHAR(50),
    ExchangeRate DECIMAL(18, 6),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

-- Audit Trails Table
CREATE TABLE AuditTrails (
    AuditId INT PRIMARY KEY IDENTITY,
    TableName NVARCHAR(50),
    RecordId INT,
    Operation NVARCHAR(10), -- e.g., "INSERT", "UPDATE", "DELETE"
    ChangeDateTime DATETIME DEFAULT GETDATE(),
    ChangedBy NVARCHAR(100),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE SponsorshipDetails (
    SponsorshipDetailId INT PRIMARY KEY IDENTITY,
	SponsorshipId INT,
    StudentId INT,
	ClassId INT,
    Amount int,
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT NULL,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (SponsorshipId) REFERENCES Sponsorships(SponsorshipId),
    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
	FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
);
CREATE INDEX IDX_SponsorshipDetails_SponsorId ON SponsorshipDetails(SponsorshipId);

Create Table AcademicYears(
AcademicYearId INT Primary Key Identity (1,1),
AcademicYearName nvarchar (12) Null,
StartYear DateTime Default GetDate(),
EndYear DateTime Default GetDate(),
StudentId Int Null,
StudentAcademicId int Null,
ExamResultId int Null,
CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT Null,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT NULL,
	IsActive BIT DEFAULT 1

	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
	FOREIGN KEY (StudentAcademicId) REFERENCES StudentAcademic(StudentAcademicId),
	FOREIGN KEY (ExamResultId) REFERENCES ExamResults(ExamResultId),
);

-----------------Inventory Management-----------------

CREATE TABLE InventoryCategories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
	CreatedAt DATETIME2 DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1,
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE InventoryStatus (
    StatusID INT PRIMARY KEY IDENTITY(1,1),  -- Auto-incrementing primary key
    StatusName NVARCHAR(50) NOT NULL UNIQUE,  -- Status name (e.g., In Use, Repair, Discard)
    CreatedAt DATETIME DEFAULT GETDATE(),  -- Timestamp for creation
    CreatedBy INT NOT NULL,  -- User who created the entry
    UpdatedAt DATETIME NULL,  -- Timestamp for last update
    UpdatedBy INT NULL,  -- User who last updated the entry
    IsActive BIT DEFAULT 1  -- Active status (1 = Active, 0 = Inactive)
);

CREATE TABLE InventoryItems (
    ItemID INT PRIMARY KEY IDENTITY(1,1),
    ItemName NVARCHAR(100) NOT NULL,
    CategoryID INT FOREIGN KEY REFERENCES InventoryCategories(CategoryID),
    Description NVARCHAR(255),
	TotalQuantity INT,
    UnitPrice DECIMAL(18, 2),
    ReorderLevel INT DEFAULT 100,
    CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1,
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE ItemDetail (
    ItemDetailID INT PRIMARY KEY IDENTITY(1,1),
	ItemID INT NOT NULL,
	TagNumber VARCHAR(50) UNIQUE NOT NULL, -- Unique tag for each item unit
    StatusID INT NOT NULL, -- Reference to Status table (In Stock, Allocated, In Repair, Discarded)
    CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1,
	FOREIGN KEY (ItemID) REFERENCES InventoryItems(ItemID),
	FOREIGN KEY (StatusID) REFERENCES InventoryStatus(StatusID),
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE InventoryStocks (
    StockID INT PRIMARY KEY IDENTITY(1,1),
    ItemID INT FOREIGN KEY REFERENCES InventoryItems(ItemID),
    Quantity INT NOT NULL,
    TransactionType NVARCHAR(10) CHECK (TransactionType IN ('IN', 'OUT')), -- IN for stock in, OUT for stock out
    TransactionDate DATETIME DEFAULT GETDATE(),
    Remarks NVARCHAR(255),
    StatusID INT FOREIGN KEY REFERENCES InventoryStatus(StatusID),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1,
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
);

CREATE TABLE InventoryPurchases (
    PurchaseID INT PRIMARY KEY IDENTITY(1,1),
    ItemID INT FOREIGN KEY REFERENCES InventoryItems(ItemID),
    SupplierName NVARCHAR(100) NOT NULL, -- Supplier or vendor name
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL, -- Price per unit at the time of purchase
    TotalCost AS (Quantity * UnitPrice) PERSISTED, -- Calculated field for total cost
    PurchaseDate DATETIME DEFAULT GETDATE(),
    InvoiceNumber NVARCHAR(50), -- Invoice or receipt number
    Remarks NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT,
    UpdatedAt DATETIME NULL,
    UpdatedBy INT,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId)
);


CREATE TABLE AssetAllocation (
    AllocationID INT PRIMARY KEY IDENTITY(1,1),
    ItemID INT FOREIGN KEY REFERENCES InventoryItems(ItemID),
    AllocatedTo NVARCHAR(100), -- Could be a classroom
    AllocatedBy INT,
    AllocationDate DATE,
	AllocatedLocation NVARCHAR(100),
	Quantity INT,
    Remarks NVARCHAR(255), 
    StatusID INT FOREIGN KEY REFERENCES InventoryStatus(StatusID),
	CreatedAt DATETIME DEFAULT GETDATE(),
	CreatedBy INT,
	UpdatedAt DATETIME NULL,
	UpdatedBy INT,
	IsActive BIT DEFAULT 1,
	FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),
	FOREIGN KEY (AllocatedBy) REFERENCES Users(UserId),
);

-- VIEWS --
GO
CREATE VIEW DashboardCountView AS
SELECT 
     --Total counts
    (SELECT COUNT(*) FROM Sponsors) AS TotalSponsors,
    (SELECT COUNT(*) FROM Employees) AS TotalEmployees,
    (SELECT COUNT(*) FROM Students) AS TotalStudents,
    (SELECT COUNT(*) FROM Sponsorships) AS TotalStudentsSponsor,

     --Monthly data for sponsors, employees, and students
    (SELECT COUNT(*) 
        FROM Sponsors 
        WHERE CreatedAt BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE()
    ) AS NewSponsorsThisMonth,

    (SELECT COUNT(*) 
        FROM Employees 
        WHERE CreatedAt BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE()
    ) AS NewEmployeesThisMonth,

    (SELECT COUNT(*) 
        FROM Students 
        WHERE CreatedAt BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE()
    ) AS NewStudentsThisMonth,
	 (SELECT COUNT(*) 
        FROM Sponsorships 
        WHERE CreatedAt BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE()
    ) AS NewStudentsSponsoredThisMonth

GO

GO
CREATE VIEW vw_InventoryStockSummary AS
SELECT 
    I.ItemID,
    I.ItemName,
    C.CategoryName,
    SUM(CASE WHEN S.TransactionType = 'IN' THEN S.Quantity ELSE 0 END) AS TotalStockIn,
    SUM(CASE WHEN S.TransactionType = 'OUT' THEN S.Quantity ELSE 0 END) AS TotalStockOut,
    (SUM(CASE WHEN S.TransactionType = 'IN' THEN S.Quantity ELSE 0 END) - 
     SUM(CASE WHEN S.TransactionType = 'OUT' THEN S.Quantity ELSE 0 END)) AS CurrentStock
FROM InventoryItems I
LEFT JOIN InventoryStocks S ON I.ItemID = S.ItemID
LEFT JOIN InventoryCategories C ON I.CategoryID = C.CategoryID
GROUP BY I.ItemID, I.ItemName, C.CategoryName;
GO

GO
CREATE VIEW [dbo].[vw_ApplicantDetails]
AS
SELECT al.ApplicationId, al.ApplicantId, al.ApplicationStatus, al.CampusId, cp.CampusName, 
al.AdmissionDecisionDate, al.Remarks, al.AppliedClassId, app.ClassName AS AppliedClassName,
al.LastClassId, rac.ClassName AS LastClassName,
                  ap.FirstName, ap.LastName, ap.FormBNumber, ap.DateOfBirth, ap.Gender,
				 p.FirstName As ParentFirstName, 
				 p.MiddleName As ParentMiddleName, 
					p.LastName As ParentLastName, 
					p.PhoneNumber, 
					p.Email, 
					p.Occupation, 
					p.SourceOfIncome, 
					p.Dependent, 
					p.MotherTongue, 
					p.ParentAddress,
					p.ResidenceStatus,
					p.Nationality
				  
FROM     dbo.Applications AS al INNER JOIN
                  dbo.Campuses AS cp ON al.CampusId = cp.CampusId INNER JOIN
                  dbo.Classes AS rac ON al.LastClassId = rac.ClassId INNER JOIN
				  dbo.Classes AS app ON al.AppliedClassId = app.ClassId INNER JOIN
                  dbo.Applicants AS ap ON ap.ApplicantId = al.ApplicantId INNER JOIN
				  dbo.StudentParent as sp ON sp.ApplicantId = al.ApplicantId LEFT JOIN
				  dbo.Parents as p ON p.ParentId = sp.ParentId
GO

-- STORED PROCEDURES --
GO
CREATE PROCEDURE InsertItemDetails 
    @ItemID INT,
    @Quantity INT,
    @CreatedBy INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Counter INT = 1;
    DECLARE @LastTagNumber INT;
    DECLARE @NewTagNumber NVARCHAR(50);

    -- Get the last TagNumber for the given ItemID
    SELECT @LastTagNumber = MAX(CAST(RIGHT(TagNumber, 4) AS INT))
    FROM ItemDetail
    WHERE ItemID = @ItemID;

    -- If no previous TagNumber exists, start from 1
    IF @LastTagNumber IS NULL
        SET @LastTagNumber = 0;

    WHILE @Counter <= @Quantity
    BEGIN
        -- Increment TagNumber and format it properly
        SET @NewTagNumber = CAST(@ItemID AS NVARCHAR(10)) + RIGHT('000' + CAST(@LastTagNumber + @Counter AS NVARCHAR(4)), 4);

        -- Insert into ItemDetails table
        INSERT INTO ItemDetail (ItemID, TagNumber, StatusID, CreatedAt, CreatedBy, IsActive)
        VALUES (@ItemID, @NewTagNumber, 1, GETDATE(), @CreatedBy, 1); -- StatusID = 1 (In Stock)

        SET @Counter = @Counter + 1;
    END;
END;
GO

GO
CREATE PROCEDURE UpdateItemStatus
    @ItemID INT,
    @StatusID INT,
    @Quantity INT,
    @UpdatedBy INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the first @Quantity rows where StatusID = 1 for the given ItemID
    UPDATE ItemDetail
    SET StatusID = @StatusID,
        UpdatedAt = GETDATE(),
        UpdatedBy = @UpdatedBy
    WHERE ItemDetailID IN (
        SELECT TOP (@Quantity) ItemDetailID
        FROM ItemDetail
        WHERE ItemID = @ItemID AND StatusID = 1
        ORDER BY ItemDetailID ASC
    );
END;
GO

GO

CREATE VIEW [dbo].[TimetableView] AS
SELECT 
    tt.TimetableId,
    tt.CampusId,
    c.CampusName,
    tt.ClassId,
    cl.ClassName,
    tt.SubjectId,
    s.SubjectName,
    tt.PeriodId,
    p.PeriodName,
    p.StartTime,
    p.EndTime,
    tt.DayOfWeek
FROM 
    Timetables tt
INNER JOIN 
    Campuses c ON tt.CampusId = c.CampusId
INNER JOIN 
    Classes cl ON tt.ClassId = cl.ClassId
INNER JOIN 
    Subjects s ON tt.SubjectId = s.SubjectId
INNER JOIN 
    Periods p ON tt.PeriodId = p.PeriodId
WHERE 
    tt.IsActive = 1
GO