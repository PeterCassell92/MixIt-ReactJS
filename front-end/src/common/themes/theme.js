//regular theme.
const Theme1 = {
    main: {
        color: { 
            textheading: "var(--off-white)",
            textbody: "var(--off-white)",
            background: "var(--primary)",
            success: "var(--success)",
            error: "var(--danger)",
            warning: "var(--warning)",
            info: "var(--secondary)",
            svgfill: "var(--off-white)",
            linkhover:"var(--secondary)",
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
    container:{
        color:{
            background: "var(--off-white)",
            textheading: "var(--off-white)",
            textbody: "var(--off-white)",
            svgfill: "var(--primary)",
            border: "var(--tint)"
        },
        font:{

        }
    }

};

const selectedTheme = Theme1;

export {selectedTheme}
export default {selectedTheme};