module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                parallel: {
                    100: "#D7F333",
                    200: "#040503"
                }
            }
        },
        borderRadius: {
            none: "0",
            xl: "1rem",
            "2xl": "2rem",
            full: "999999px"
        },
        maxHeight: {
            0: "0",
            "1/4": "25%",
            "1/2": "50%",
            "3/4": "75%",
            full: "100%",
            "1/2-screen": "50vh"
        }
    },
    variants: {
        extend: {
            zIndex: ["hover", "active"],
            transitionDuration: ["hover", "focus"]
        }
    },
    plugins: []
}
