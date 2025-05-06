import { ref } from "vue";
import ColorPicker from 'primevue/colorpicker';
const colorHEX = ref('6466f1');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex flex-col" }));
const __VLS_0 = {}.ColorPicker;
/** @type {[typeof __VLS_components.ColorPicker, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ modelValue: (__VLS_ctx.colorHEX), inputId: "cp-hex", format: "hex" }, { class: "rounded-2xl" })));
const __VLS_2 = __VLS_1(Object.assign({ modelValue: (__VLS_ctx.colorHEX), inputId: "cp-hex", format: "hex" }, { class: "rounded-2xl" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "font-medium flex-col" }));
(__VLS_ctx.colorHEX);
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ColorPicker: ColorPicker,
            colorHEX: colorHEX,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
