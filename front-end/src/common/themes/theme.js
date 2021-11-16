//regular theme.
const Theme1 = {
    main: {
        color: { 
            textheading: "var(--bs-off-white)",
            textbody: "var(--bs-off-white)",
            background: "var(--bs-primary)",
            success: "var(--bs-success)",
            error: "var(--bs-danger)",
            warning: "var(--bs-warning)",
            info: "var(--bs-secondary)",
            svgfill: "var(--bs-off-white)",
            linkhover:"var(--bs-secondary)",
        },
        font :{
        }
    },
    input:{
        color:{
            text: "var(--bs-dark)",
            placeholder: "var(--bs-light)",
            label: "var(--bs-dark)",
            tinted: "var(--bs-tint)",
            background: "var(--bs-off-white)",
            innerSeparator: "var(--bs-text)",
            backgroundalt: "white"
        },
        font:{

        },
        height:{
            standard: "22px",
        }
    },
    button:{
        color:{
            placeholder: "var(--bs-light)",
        },
        font:{

        }
    },
    container:{
        color:{
            background: "var(--bs-off-white)",
            textheading: "var(--bs-dark)",
            textbody: "var(--bs-light)",
            svgfill: "var(--bs-primary)",
            border: "var(--bs-tint)"
        },
        font:{

        }
    },
    audioplayer:{
        slider:{
            color:{
                barbackground: "var(--bs-primary)",
                seekbefore: "var(--bs-tint)",
                knobby: "var(--bs-dark)",
                knobbyselected:"var(--bs-info)"
            },
            size:{
                seekbeforewidth: "100px"
            }
        }
    }
};

const selectedTheme = Theme1;

export {selectedTheme}
export default {selectedTheme};