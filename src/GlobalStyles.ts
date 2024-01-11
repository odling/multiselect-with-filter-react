/* global */
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-family:Open Sans, sans-serif;
		&:-webkit-autofill::first-line,
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			font-family: Open Sans, sans-serif !important;
		}
	}

	/* Style resets */
	html, body, div, span, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	abbr, address, cite, code,
	del, dfn, em, img, ins, kbd, q, samp,
	small, strong, sub, sup, var,
	b, i,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section, summary,
	time, mark, audio, video, button {
		margin:0;
		padding:0;
		border:0;
		outline:0;
		vertical-align:baseline;
		background:transparent;
	}



	article,aside,details,figcaption,figure,
	footer,header,hgroup,menu,nav,section { 
		display:block;
	}

	nav ul {
		list-style:none;
	}

	blockquote, q {
		quotes:none;
	}

	blockquote:before, blockquote:after,
	q:before, q:after {
		content:'';
		content:none;
	}

	a {
		margin:0;
		padding:0;
		font-size:100%;
		vertical-align:baseline;
		background:transparent;
		text-decoration: none;
		color: ${({ theme }) => theme.color.foreground}
	}
    
	input, select {
		vertical-align:middle;
	}

	ul{
		list-style:none;
		padding:0;
	}

	html{
		font-size:16px;
		height: 100%;
	}

	body {
		line-height:1.5;
		height: 100%;
	}

	#root {
		height: 100%;
		width: 100%;
		overscroll-behavior: none;
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: ${({ theme }) => theme.color.background};
		color: ${({ theme }) => theme.color.foreground}
	}

`;

export default GlobalStyles;
