import '../../styles.css';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
// Datos del formulario
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const name = ref('');
const role = ref('');
// Mensaje de estado
const statusMessage = ref('');
// Función para registrar
function handleRegister() {
    statusMessage.value = 'Registrando...';
    axios.post('https://api-catalogos.twistic.app/api/register', {
        nombre: name.value,
        cargo: role.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
    })
        .then(() => {
        statusMessage.value = 'Registro completado. Redirigiendo...';
        setTimeout(() => {
            router.push('/login');
        }, 1500);
    })
        .catch(error => {
        console.error('Error en el registro:', error);
        statusMessage.value = 'Error al registrar. Revisa los datos.';
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex-1 mt-[60px] flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:bg-gradient-to-r dark:from-neutral-950 dark:via-none dark:to-slate-900" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "w-120 m-auto p-5 py-20 rounded-3xl bg-white shadow-[0px_20px_24px_30px_rgba(0,_0,_0,_0.1)] dark:bg-gray-700" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "sm:mx-auto sm:w-full sm:max-w-sm " }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-indigo-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)(Object.assign({ onSubmit: (__VLS_ctx.handleRegister) }, { class: "space-y-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: "name" }, { class: "block text-sm/6 font-medium text-gray-900 dark:text-indigo-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ value: (__VLS_ctx.name), type: "text", name: "name", id: "name", autocomplete: "name" }, { class: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: "role" }, { class: "block text-sm/6 font-medium text-gray-900 dark:text-indigo-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ value: (__VLS_ctx.role), type: "text", name: "role", id: "role", autocomplete: "role" }, { class: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: "email" }, { class: "block text-sm/6 font-medium text-gray-900 dark:text-indigo-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ type: "email", name: "email", id: "email", autocomplete: "email" }, { class: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800" }));
(__VLS_ctx.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: "password" }, { class: "block text-sm/6 font-medium text-gray-900 dark:text-indigo-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ type: "password", name: "password", id: "password", autocomplete: "current-password" }, { class: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800" }));
(__VLS_ctx.password);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: "password_confirmation" }, { class: "block text-sm/6 font-medium text-gray-900 dark:text-indigo-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-2" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ type: "password", name: "password_confirmation", id: "password_confirmation", autocomplete: "current-password" }, { class: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6 dark:bg-gray-500 dark:text-indigo-50 dark:outline-gray-500 dark:focus:outline-gray-800" }));
(__VLS_ctx.passwordConfirmation);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ type: "submit" }, { class: "flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500" }));
if (__VLS_ctx.statusMessage) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-4 text-center text-gray-900 dark:text-indigo-50" }));
    (__VLS_ctx.statusMessage);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "mt-10 text-center text-sm/6 text-gray-500" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)(Object.assign({ href: "/login" }, { class: "font-semibold text-cyan-500 hover:text-cyan-400" }));
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-[60px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-white']} */ ;
/** @type {__VLS_StyleScopedClasses['via-slate-200']} */ ;
/** @type {__VLS_StyleScopedClasses['to-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:from-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:via-none']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:to-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['w-120']} */ ;
/** @type {__VLS_StyleScopedClasses['m-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0px_20px_24px_30px_rgba(0,_0,_0,_0.1)]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl/9']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-1']} */ ;
/** @type {__VLS_StyleScopedClasses['-outline-offset-1']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:-outline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:outline-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:outline-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-1']} */ ;
/** @type {__VLS_StyleScopedClasses['-outline-offset-1']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:-outline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:outline-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:outline-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-1']} */ ;
/** @type {__VLS_StyleScopedClasses['-outline-offset-1']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:-outline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:outline-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:outline-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-1']} */ ;
/** @type {__VLS_StyleScopedClasses['-outline-offset-1']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:-outline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:outline-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:outline-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-1']} */ ;
/** @type {__VLS_StyleScopedClasses['-outline-offset-1']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder:text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:-outline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:outline-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:focus:outline-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cyan-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-cyan-700']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-indigo-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm/6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-cyan-400']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
            name: name,
            role: role,
            statusMessage: statusMessage,
            handleRegister: handleRegister,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
