import { ref } from "vue";
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
import { useCookies } from "vue3-cookies";

export default function useStudents() {
    const students = ref([]);

    const { cookies } = useCookies();
    const token = cookies.get("accessToken");
    const headers = { Authorization: `Bearer ${token}` };

    const getStudents = (studentName, studentCode, dateOfBirth) => {
        const config = {
            params: {
                studentCode: studentCode,
                studentName: studentName,
                dateOfBirth: dateOfBirth,
            },
            headers: headers,
        };

        axios
            .get("http://localhost:8081/students", config)
            .then((res) => {
                students.value = res.data;
                // format date of birth
                students.value.map((student) => {
                    if (student.dateOfBirth) {
                        let dateFormatted = `${student.dateOfBirth[2]}/${student.dateOfBirth[1]}/${student.dateOfBirth[0]}`;
                        student.dateOfBirth = dateFormatted;
                    }
                });
            })
            .catch((err) => {
                console.log("err: ", err);
                notify({
                    title: "Failed to load students",
                    type: "error",
                });
            });
    };

    const getStudentById = async (studentId) => {
        let result = null;
        await axios
            .get(
                `http://localhost:8081/students/${studentId}`,

                {
                    headers: headers,
                }
            )
            .then((res) => {
                result = res.data;
            })
            .catch((err) => {
                console.log("err: ", err);
                notify({
                    title: "Failed to load student info",
                    type: "error",
                });
            });
        return result;
    };

    const generateCode = async () => {
        let result = "";
        await axios
            .get("http://localhost:8081/students/generatedCode", {
                headers: headers,
            })
            .then((res) => {
                result = res.data;
            })
            .catch((err) => {
                console.log("err: ", err);
                notify({
                    title: "Failed to generate student code",
                    type: "error",
                });
            });
        return result;
    };

    const addStudent = (
        studentCode,
        studentName,
        address,
        averageScore,
        dateOfBirth
    ) => {
        // Validate input
        if (!studentCode || !studentName.trim()) {
            notify({
                title: "Please fill Student Code and Student Name",
                type: "error",
            });
            return;
        }

        if (studentName.length > 20) {
            notify({
                title: "Student Name must be less than 21 characters",
                type: "error",
            });
            return;
        }

        if (address.length > 255) {
            notify({
                title: "Student Name must be less than 256 characters",
                type: "error",
            });
            return;
        }

        // Add student
        axios
            .post(
                "http://localhost:8081/students/create",
                {
                    studentName: studentName,
                    studentCode: studentCode,
                    address: address,
                    averageScore: averageScore,
                    dateOfBirth: dateOfBirth,
                },
                {
                    headers: headers,
                }
            )
            .then((res) => {
                console.log("res: ", res);
                notify({
                    title: "Add student successfully",
                    type: "success",
                });
            })
            .catch((err) => {
                console.log("err: ", err);
                notify({
                    title: "Failed to add student",
                    type: "error",
                });
            });
    };

    const updateStudent = (
        studentId,
        studentName,
        address,
        averageScore,
        dateOfBirth
    ) => {
        // Validate input
        if (studentName.length > 20) {
            notify({
                title: "Student Name must be less than 21 characters",
                type: "error",
            });
            return;
        }

        if (address.length > 255) {
            notify({
                title: "Student Name must be less than 256 characters",
                type: "error",
            });
            return;
        }

        // Update student
        axios
            .put(
                `http://localhost:8081/students/update/${studentId}`,
                {
                    studentName: studentName,
                    address: address,
                    averageScore: averageScore,
                    dateOfBirth: dateOfBirth,
                },
                {
                    headers: headers,
                }
            )
            .then((res) => {
                console.log("res: ", res);
                notify({
                    title: "Update student successfully",
                    type: "success",
                });
            })
            .catch((err) => {
                console.log("err: ", err);
                notify({
                    title: "Failed to update student",
                    type: "error",
                });
            });
    };

    const deleteStudent = (studentId) => {
        axios
            .delete(`http://localhost:8081/students/${studentId}`, {
                headers: headers,
            })
            .then((res) => {
                console.log("res: ", res);
                notify({
                    title: "Delete student successfully",
                    type: "success",
                });
                getStudents();
            })
            .catch((err) => {
                console.log("err: ", err);
                notify({
                    title: "Failed to delete student",
                    type: "error",
                });
            });
    };

    return {
        students,
        getStudents,
        generateCode,
        addStudent,
        updateStudent,
        getStudentById,
        deleteStudent,
    };
}
