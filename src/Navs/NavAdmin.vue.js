import { RouterLink, useRoute } from 'vue-router';
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import '../styles.css';
// Adquiirir el rol del usuario
const role = sessionStorage.getItem('userRole');
// Título de la ruta
const title = ref(document.title);
const route = useRoute();
watch(() => route.fullPath, () => {
    title.value = document.title;
});
// Estado del menú
const navExpanded = ref(false);
// Alternar el menú
const ToggleNav = () => {
    navExpanded.value = !navExpanded.value;
};
// Cerrar el menú
const closeNav = () => {
    navExpanded.value = false;
};
// Detectar clics fuera del menú
const handleClickOutside = (event) => {
    const navMenu = document.querySelector('.w-46');
    const toggleBtn = document.querySelector('.size-12');
    if (navExpanded.value &&
        navMenu &&
        toggleBtn &&
        !navMenu.contains(event.target) &&
        !toggleBtn.contains(event.target)) {
        closeNav();
    }
};
onMounted(() => {
    window.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex h-auto" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)(Object.assign({ class: "flex h-17 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0 px-5 z-50" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex items-center flex-1 justify-start" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "text-white font-bold text-xl" }));
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.ToggleNav) }, { class: "size-12 mr-4 rounded-tl-2xl rounded-br-2xl overflow-hidden border-2 border-indigo-500 hover:border-cyan-400 transition-all duration-300 ease-in-out shadow-lg hover:shadow-indigo-500/50 cursor-pointer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign({ src: "/avatar.png", alt: "Avatar" }, { class: "w-full h-full object-cover" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "w-46 bg-neutral-950 rounded-b-2xl fixed right-0 mt-[68px] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50" }, { class: ({ 'max-h-[600px]': __VLS_ctx.navExpanded, 'max-h-0': !__VLS_ctx.navExpanded }) }));
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/dashboard" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_2 = __VLS_1(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/dashboard" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_3.slots.default;
var __VLS_3;
const __VLS_8 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/profile" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_10 = __VLS_9(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/profile" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_11.slots.default;
var __VLS_11;
const __VLS_16 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/newCatalog" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_18 = __VLS_17(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/newCatalog" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/catalogs" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_26 = __VLS_25(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/catalogs" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_27.slots.default;
var __VLS_27;
if (__VLS_ctx.role && (__VLS_ctx.role === 'admin')) {
    const __VLS_32 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/templates" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
    const __VLS_34 = __VLS_33(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/templates" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (__VLS_ctx.closeNav)
    };
    __VLS_35.slots.default;
    var __VLS_35;
}
if (__VLS_ctx.role && (__VLS_ctx.role === 'admin')) {
    const __VLS_40 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/fields" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
    const __VLS_42 = __VLS_41(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/fields" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (__VLS_ctx.closeNav)
    };
    __VLS_43.slots.default;
    var __VLS_43;
}
const __VLS_48 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/notifications" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_50 = __VLS_49(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/notifications" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_52;
let __VLS_53;
let __VLS_54;
const __VLS_55 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_51.slots.default;
var __VLS_51;
if (__VLS_ctx.role && (__VLS_ctx.role === 'admin')) {
    const __VLS_56 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/users" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
    const __VLS_58 = __VLS_57(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/users" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_60;
    let __VLS_61;
    let __VLS_62;
    const __VLS_63 = {
        onClick: (__VLS_ctx.closeNav)
    };
    __VLS_59.slots.default;
    var __VLS_59;
}
const __VLS_64 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/logout" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_66 = __VLS_65(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/logout" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
let __VLS_70;
const __VLS_71 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_67.slots.default;
var __VLS_67;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-17']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-l']} */ ;
/** @type {__VLS_StyleScopedClasses['from-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['to-slate-800']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['size-12']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-tl-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-br-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-cyan-400']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-indigo-500/50']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['w-46']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-[68px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-[cubic-bezier(0.4,0,0.2,1)]']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[600px]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-0']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['translate-y-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            role: role,
            title: title,
            navExpanded: navExpanded,
            ToggleNav: ToggleNav,
            closeNav: closeNav,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
