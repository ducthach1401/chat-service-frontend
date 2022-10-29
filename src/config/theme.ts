// main color
const Yellow = '#FFD834';
const ToryBlue = '#304D95';
// main text
const mainText = '#222222';
const mainTitle = '#FFFFFF';
const UniversLT = 'Univers LT Std, sans-serif';

// addition color
const Mango = '#FF6D03';
const DarkMango = '#CF8B06';
const ForestColor = '#009444';

// MRG Color
const lightBlack = '#3c4252';
const blackText = '#000000DE';
const background = '#F5F5F5';
const errorColor = '#F44335';

const theme = {
	bg: '#FFFFFF',
	text: mainText,
	title: mainTitle,

	// Font family
	mainFont: UniversLT,

	// Color
	mainColor: Yellow,
	subColor: ToryBlue,
	mangoColor: Mango,
	darkMango: DarkMango,
	forestColor: ForestColor,

	// MRG Color
	blackText: blackText,
	background: background,
	errorColor,
	lightBlack,

	//other
	breakpoints: {
		xs: 0,
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1281,
		xxl: 1570,
	},
};

export default theme;

export const fontMontserrat =
	'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
