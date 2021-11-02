//regular theme.
const Theme1 = {
    main: {
        color: {
            body: "var(--text)",
            background: "var(--primary)",
            success: "var(--success)",
            error: "var(--danger)",
            warning: "var(--warning)",
            info: "var(--secondary)",
            svgfill: "var(--primary)",
        },
        font :{
    
        }
    },
    input:{
        color:{
            text: "var(--text)",
            placeholder: "var(--placeholder)",
            label: "var(--text)",
            tinted: "",
            background: "var(--off-white)",
            innerSeparator: "var(--text)",
        },
        font:{

        },
        height:{
            standard: "22px",
        }
    },
    button:{
        color:{
            placeholder: "var(--placeholder)",
        },
        font:{

        }
    },

};

const selectedTheme = Theme1;

export {selectedTheme}
export default {selectedTheme};