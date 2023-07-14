<template>
    <div class="student-update">
        <h1 v-if="isAddPage">ADD STUDENT</h1>
        <h1 v-else>UPDATE STUDENT</h1>
        <form @submit.prevent="onSubmitClick">
            <table>
                <tr v-if="!isAddPage">
                    <td><span>Student ID</span></td>
                    <td>
                        <input v-model="student.studentId" required disabled />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td><span>Student Code</span></td>
                    <td>
                        <input
                            v-model="student.studentCode"
                            required
                            disabled="isAddPage"
                        />
                    </td>
                    <td>
                        <button
                            v-if="isAddPage"
                            @click.prevent="onGenerateClick"
                        >
                            Generate Code
                        </button>
                    </td>
                </tr>
                <tr>
                    <td><span>Student Name</span></td>
                    <td>
                        <input v-model="student.studentName" required />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td><span>Birthday</span></td>
                    <td>
                        <input v-model="student.dateOfBirth" type="date" />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td><span>Address</span></td>
                    <td>
                        <input v-model="student.address" />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td><span>Average Score</span></td>
                    <td>
                        <input v-model="student.averageScore" />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div class="actions">
                            <router-link to="/">
                                <button>Back</button>
                            </router-link>
                            <button type="submit">
                                {{ isAddPage ? "Add" : "Save" }}
                            </button>
                        </div>
                    </td>
                    <td></td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import useStudents from "../composables/students";

export default {
    props: {
        isAddPage: {
            type: Boolean,
            require: true,
        },
    },

    setup(props) {
        const { generateCode, addStudent, updateStudent, getStudentById } =
            useStudents();

        const studentId = useRoute().params.id;

        const student = reactive({
            studentId: "",
            studentName: "",
            studentCode: "",
            address: "",
            averageScore: "",
            dateOfBirth: "",
        });

        onMounted(() => {
            // Fetch student info on UpdatePage
            if (props.isAddPage) return;
            getStudentById(useRoute().params.id).then((res) => {
                student.studentId = res.studentId;
                student.studentName = res.studentName;
                student.studentCode = res.studentCode;
                student.address = res.address;
                student.averageScore = res.averageScore;
                // Date of birth processing
                const dobRaw = res.dateOfBirth;
                if (!dobRaw) {
                    student.dateOfBirth = null;
                } else {
                    // create date of birth from proxy array
                    let year = dobRaw[0];
                    let month = dobRaw[1];
                    let day = dobRaw[2];
                    if (month < 10) month = "0" + month;
                    if (day < 10) day = "0" + day;
                    student.dateOfBirth = `${year}-${month}-${day}`;
                }
            });
        });

        const onGenerateClick = () => {
            generateCode().then((res) => {
                student.studentCode = res;
            });
        };

        const onSubmitClick = () => {
            // Check for adding or updating
            if (props.isAddPage) {
                onAddClick();
            } else {
                onUpdateClick();
            }
        };

        const onAddClick = () => {
            addStudent(
                student.studentCode,
                student.studentName,
                student.address,
                student.averageScore,
                student.dateOfBirth
            );

            student.studentCode = "";
            student.studentName = "";
            student.address = "";
            student.averageScore = "";
            student.dateOfBirth = "";
        };

        const onUpdateClick = () => {
            updateStudent(
                studentId,
                student.studentName,
                student.address,
                student.averageScore,
                student.dateOfBirth
            );
        };

        return {
            onGenerateClick,
            onAddClick,
            onUpdateClick,
            onSubmitClick,
            student,
        };
    },
};
</script>

<style lang="scss">
@import "../assets/styles/student-update.scss";
</style>
