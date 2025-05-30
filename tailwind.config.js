/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {//to use these fonts in our applications
      fontFamily:{
        zentry:['zentry','san-serif'],
        general:['general','san-serif'],
        'circular-web':['circular-web','san-serif'],
        'robert-medium':['robert-medium','san-serif'],
        'robert-regular':['robert-regular','san-serif'],
      },
      colors:{
        blue:{
          50:"#DFDFF0",
          75:"#DFDFF2",
          100:"#F0F2FA",
          200:"#010101",
          300:"#4FB7DD"
        },
        violet:{
          300:"#5724FF"
        },
        yellow:{
          100:"#8E983F",
          300:"#EDFF66"
        }
      }
    },
  },
  plugins: [],
}

