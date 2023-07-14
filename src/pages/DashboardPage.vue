<template>
    <div class="dashboard content">
        <!-- Filter -->
        <form class="student-filter" @submit.prevent="filterStudents">
            <table>
                <tr>
                    <td>
                        <span class="label">Student Code</span>
                    </td>
                    <td>
                        <input type="text" v-model="filter.studentCode" />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <span class="label">Student Name</span>
                    </td>
                    <td>
                        <input type="text" v-model="filter.studentName" />
                    </td>
                    <td><button type="submit">Search</button></td>
                </tr>
                <tr>
                    <td>
                        <span class="label">Birthday</span>
                    </td>
                    <td>
                        <input type="date" v-model="filter.dateOfBirth" />
                    </td>
                    <td>
                        <router-link to="/add-student">
                            <button>Add student</button>
                        </router-link>
                    </td>
                </tr>
            </table>
        </form>
        <!-- Content -->
        <table class="student-list">
            <thead>
                <th>No</th>
                <th>Code</th>
                <th>Name</th>
                <th>Birthday</th>
                <th>Address</th>
                <th>Score</th>
                <th>Edit</th>
            </thead>
            <tr v-for="student in showStudents" :key="student.studentId">
                <td>
                    {{ student.studentId }}
                </td>
                <td>
                    {{ student.studentCode }}
                </td>
                <td>
                    {{ student.studentName }}
                </td>
                <td>
                    {{ student.dateOfBirth }}
                </td>
                <td>
                    {{ student.address }}
                </td>
                <td>
                    {{ student.averageScore }}
                </td>
                <td class="edit-col">
                    <div class="buttons">
                        <router-link
                            :to="`/update-student/${student.studentId}`"
                        >
                            <button>Edit</button>
                        </router-link>
                        <button
                            class="delete-button"
                            @click="onDeleteClick(student.studentId)"
                        >
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        </table>
        <div class="pagination">
            <div class="left">
                <button>First</button>
                <button>Prev</button>
            </div>
            <div class="pages">
                <button
                    v-for="pageNumber in countOfPages"
                    :key="pageNumber"
                    :class="{ active: pageNumber == currentPage }"
                    @click="goToPage(pageNumber)"
                >
                    {{ pageNumber }}
                </button>
            </div>
            <div class="right">
                <button>Next</button>
                <button>Last</button>
            </div>
        </div>
    </div>
    <div class="pop-up" v-if="showPopUp">
        <div class="container">
            <span>Are you sure you want to delete this student ?</span>
            <div class="choices">
                <button @click="onConfirmDelete">Delete</button>
                <button @click="showPopUp = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import useStudents from "../composables/students";
import { onMounted, reactive, ref } from "vue";

export default {
    name: "DashboardPage",
    setup() {
        const {
            showStudents,
            countOfPages,
            currentPage,
            goToPage,
            getStudents,
            deleteStudent,
        } = useStudents();

        const showPopUp = ref(false);

        let selectedStudentId;

        const filter = reactive({
            studentCode: "",
            studentName: "",
            dateOfBirth: "",
        });

        onMounted(() => {
            getStudents("", "", "");
        });

        const filterStudents = () => {
            getStudents(
                filter.studentName,
                filter.studentCode,
                filter.dateOfBirth
            );
        };

        const onDeleteClick = (studentId) => {
            selectedStudentId = studentId;
            showPopUp.value = true;
        };

        const onConfirmDelete = () => {
            deleteStudent(selectedStudentId);
            showPopUp.value = false;
        };

        return {
            showStudents,
            filter,
            showPopUp,
            countOfPages,
            currentPage,
            goToPage,
            onDeleteClick,
            onConfirmDelete,
            filterStudents,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/styles/dashboard.scss";
</style>
