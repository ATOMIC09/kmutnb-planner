type ScheduleEntry = {
    section: string;
    dayAbbreviation: string;
    startTime: string;
    endTime: string;
    room: string;
    instructors: string[];
    classExam: ClassExam;
};

type ExamDetails = {
    date: string;
    startExamTime: string;
    endExamTime: string;
};

type ClassExam = {
    Midterm: ExamDetails | null;
    Final: ExamDetails | null;
};

function parseClasstime(input: string, instructors: string[], classExam: ClassExam): ScheduleEntry[] {
    const lines = input.split('<br>');
    const scheduleEntries: ScheduleEntry[] = [];

    for (let i = 0; i < lines.length; i += 2) {
        const classInfo = lines[i].trim();
        const roomInfo = lines[i + 1].trim();

        const sectionMatch = classInfo.match(/^([A-Z0-9.]+)/);
        const dayAbbreviationMatch = classInfo.match(/ ([^ ]{1,3}) /);
        const timeMatch = classInfo.match(/ (\d{2}:\d{2})-(\d{2}:\d{2})/);
        const roomMatch = roomInfo.match(/ห้อง ([^\s<]*)/);

        if (sectionMatch && dayAbbreviationMatch && timeMatch) {
            const section = sectionMatch[1];
            const dayAbbreviation = dayAbbreviationMatch[1];
            const startTime = parseTime(timeMatch[1]);
            const endTime = parseTime(timeMatch[2]);
            const room = roomMatch ? roomMatch[1] : '-';

            scheduleEntries.push({
                section,
                dayAbbreviation,
                startTime,
                endTime,
                room,
                instructors,
                classExam
            });
        }
    }
    return scheduleEntries;
}

function parseTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    return `${hours}.${minutes}`;
}

function parseInstructorName(input: string): string[] {
    return input.split('<LI>').map((instructor) => instructor.trim()).filter(Boolean);
}

function parseExamSchedule(input: string): string[] {
    return input.split('<br>').map((schedule) => schedule.trim()).filter(Boolean);
}

function parseClassExam(input: string): ClassExam {
    const lines = input.split('<br>').map((line) => line.trim());
    const classExam: ClassExam = { Midterm: null, Final: null };

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === 'MIDTERM') {
            // Find MIDTERM details
            if (lines[i + 1] && lines[i + 1] !== '-') {
                const { date, startExamTime, endExamTime } = parseExamDetails(lines[i + 1]);
                classExam.Midterm = { date, startExamTime, endExamTime };
            }
        } else if (lines[i] === 'FINAL') {
            // Find FINAL details
            if (lines[i + 1] && lines[i + 1] !== '-') {
                const { date, startExamTime, endExamTime } = parseExamDetails(lines[i + 1]);
                classExam.Final = { date, startExamTime, endExamTime };
            }
        }
    }

    return classExam;
}

function parseExamDetails(detailLine: string): ExamDetails {
    const [date, time] = detailLine.split(' ');
    const [startExamTime, endExamTime] = time.split('-');
    return {
        date: date,
        startExamTime: startExamTime,
        endExamTime: endExamTime
    };
}

export default function parseClassInformation(course: any) {
    const scheduleEntries = parseClasstime(course.classtime, parseInstructorName(course.classinstructorname), parseClassExam(course.classexam));
    return {
        coursecode: course.coursecode,
        coursename: course.coursename,
        courseunit: course.courseunit,
        scheduleEntries,
    };
}