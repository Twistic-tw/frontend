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
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ to: "dashboard" }, { class: "flex items-center space-x-2" })));
const __VLS_2 = __VLS_1(Object.assign({ to: "dashboard" }, { class: "flex items-center space-x-2" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign({ src: "/public/TW_LOGO_BLANCOy_gris.png", alt: "Twistic Logo" }, { class: "h-[6.5rem] w-auto" }));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.ToggleNav) }, { class: "size-12 mr-4 rounded-tl-2xl rounded-br-2xl overflow-hidden border-2 border-indigo-500 hover:border-cyan-400 transition-all duration-300 ease-in-out shadow-lg hover:shadow-indigo-500/50 cursor-pointer" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign({ src: "/avatar.png", alt: "Avatar" }, { class: "w-full h-full object-cover" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "w-46 bg-neutral-950 rounded-b-2xl fixed right-0 mt-[68px] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50" }, { class: ({ 'max-h-[600px]': __VLS_ctx.navExpanded, 'max-h-0': !__VLS_ctx.navExpanded }) }));
const __VLS_4 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/dashboard" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_6 = __VLS_5(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/dashboard" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_7.slots.default;
var __VLS_7;
const __VLS_12 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/profile" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_14 = __VLS_13(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/profile" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_15.slots.default;
var __VLS_15;
const __VLS_20 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/newCatalog" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_22 = __VLS_21(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/newCatalog" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_23.slots.default;
var __VLS_23;
const __VLS_28 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/catalogs" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_30 = __VLS_29(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/catalogs" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_31.slots.default;
var __VLS_31;
if (__VLS_ctx.role && (__VLS_ctx.role === 'admin')) {
    const __VLS_36 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/templates" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
    const __VLS_38 = __VLS_37(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/templates" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_40;
    let __VLS_41;
    let __VLS_42;
    const __VLS_43 = {
        onClick: (__VLS_ctx.closeNav)
    };
    __VLS_39.slots.default;
    var __VLS_39;
}
if (__VLS_ctx.role && (__VLS_ctx.role === 'admin')) {
    const __VLS_44 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/fields" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
    const __VLS_46 = __VLS_45(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/fields" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (__VLS_ctx.closeNav)
    };
    __VLS_47.slots.default;
    var __VLS_47;
}
const __VLS_52 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/notifications" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_54 = __VLS_53(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/notifications" }), { class: "transition duration-500 ease-in-out text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_56;
let __VLS_57;
let __VLS_58;
const __VLS_59 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_55.slots.default;
var __VLS_55;
if (__VLS_ctx.role && (__VLS_ctx.role === 'admin')) {
    const __VLS_60 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/users" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
    const __VLS_62 = __VLS_61(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/users" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_64;
    let __VLS_65;
    let __VLS_66;
    const __VLS_67 = {
        onClick: (__VLS_ctx.closeNav)
    };
    __VLS_63.slots.default;
    var __VLS_63;
}
const __VLS_68 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/logout" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) })));
const __VLS_70 = __VLS_69(Object.assign(Object.assign(Object.assign(Object.assign({ 'onClick': {} }, { to: "/logout" }), { class: "rounded-b-2xl transition duration-500 ease-in-out text-white text-center p-4 pb-5 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-100 translate-y-0': __VLS_ctx.navExpanded, 'opacity-0 -translate-y-2 pointer-events-none': !__VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_72;
let __VLS_73;
let __VLS_74;
const __VLS_75 = {
    onClick: (__VLS_ctx.closeNav)
};
__VLS_71.slots.default;
var __VLS_71;
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
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[6.5rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-auto']} */ ;
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
