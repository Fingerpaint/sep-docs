% fingerpaint.cls - based on mins.cls (http://tug.org/pracjourn/2005-4/hefferon/mins.cls)
% Class used for all documentation created for the 2013 SEP Fingerpaint project.
%
% 06-May-2013 Thom Castermans <t.h.a.castermans@student.tue.nl>

% --- Class structure: identification part
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{fingerpaint}

% --- Class structure: parsing options
\RequirePackage{kvoptions}
\DeclareBoolOption[true]{titlepage}
\DeclareBoolOption[false]{linenumbers}
\DeclareStringOption[5]{linenumbersmodulo}[5]

\DeclareStringOption[Full Document Name]{titlefull}[Full Document Name]
\DeclareStringOption[FDN]{titleabbr}[FDN]
\DeclareStringOption[0.0]{version}[0.0]
\DeclareStringOption[.]{pathtobase}[.]

\ProcessKeyvalOptions*

% --- Class structure: initial code part
% Project specific commands
\newcommand{\pathtobase}[1]{\fingerpaint@pathtobase/#1}

\newcommand*{\projectnameplain}{Fingerpaint}
\newcommand*{\projectauthor}{Group Fingerpaint}
\newcommand*{\projectname}{\textsc{\projectnameplain}}
\newcommand*{\applicationname}{\textsc{\projectnameplain} application}

\newcommand*{\TitleFull}{\fingerpaint@titlefull}
\newcommand*{\TitleAbbr}{\fingerpaint@titleabbr}
\newcommand*{\Version}{\fingerpaint@version}

\newcommand{\todo}[1]{\hl{#1}}

% set title and author
\title{\TitleFull{}}
\author{\projectauthor{}}

% author names
\newcommand*{\tessa}{Tessa Belder}
\newcommand*{\lasse}{Lasse Blaauwbroek}
\newcommand*{\thom}{Thom Castermans}
\newcommand*{\roel}{Roel van Happen}
\newcommand*{\benjamin}{Benjamin van der Hoeven}
\newcommand*{\femke}{Femke Jansen}
\newcommand*{\hugo}{Hugo Snel}

% author names & IDs
\newcommand*{\tessaID}{Tessa Belder (0739377)}
\newcommand*{\lasseID}{Lasse Blaauwbroek (0749928)}
\newcommand*{\thomID}{Thom Castermans (0739808)}
\newcommand*{\roelID}{Roel van Happen (0751614)}
\newcommand*{\benjaminID}{Benjamin van der Hoeven (0758975)}
\newcommand*{\femkeID}{Femke Jansen (0741948)}
\newcommand*{\hugoID}{Hugo Snel (0657700)}

% management names
\newcommand*{\simon}{Simon Burg}
\newcommand*{\areti}{Areti Paziourou}
\newcommand*{\luc}{Luc de Smet}

\newcommand*{\markbrand}{Mark van den Brand, MF 7.096}
\newcommand*{\lou}{Lou Somers, MF 7.145}
\newcommand*{\ion}{Ion Barosan, MF 7.082}

% custom name
\newcommand*{\patrick}{Patrick Anderson, GEM-Z 4.147}

% --- Class structure: class extends the report class
\LoadClass[11pt,a4paper,twoside]{report}

% --- Class structure: loading packages
\RequirePackage{amsmath, amsfonts, amssymb, array, a4wide,%
		fancyhdr, graphicx, lineno, graphicx, epsfig, soul,%
		color, wallpaper, pbox, tabularx, booktabs, longtable%
	}
\RequirePackage[square, numbers]{natbib}
\RequirePackage[defaultlines=5,all]{nowidow}
\RequirePackage[toc, page]{appendix}
\RequirePackage[pdfborder={0 0 0}]{hyperref}

% --- Class structure: main code part
% Set style and renewcommand so that references can be put anywhere
% in the document, instead of only at the end
\renewcommand{\bibsection}{}
\bibliographystyle{ieeetr}

% Linenumbers, only enabled when set in options
\iffingerpaint@linenumbers
	% Running line numbers:
	\linenumbers
	% Number only every 5:th line:
	\modulolinenumbers[\fingerpaint@linenumbersmodulo]
\fi

% Fancy titlepage, only enabled when option is set
\iffingerpaint@titlepage
	\renewcommand*{\maketitle}{%
		\ThisLRCornerWallPaper{1.0}{\pathtobase{background}}
		\begin{titlepage}
		\begin{center}
			% Top
			\includegraphics[width=0.15\textwidth]{\pathtobase{tue}}\\[1cm]
			{\LARGE Project \projectname}\\[0.5cm]
			{\Large  \TitleAbbr-\Version}\\[3.5cm]
			{\huge \bfseries \TitleFull}\\[1.5cm]

			% Authors and teacher
			\begin{minipage}{0.5\textwidth}
			\begin{flushleft} \large
			\emph{Authors:}\\
			\tessaID\\
			\lasseID\\
			\thomID\\
			\roelID\\
			\benjaminID\\
			\femkeID\\
			\hugoID\\
			~\\
			~\\
			~\\
			~\\
			~\\
			~
			\end{flushleft}
			\end{minipage}
			\begin{minipage}{0.4\textwidth}
			\begin{flushright} \large
			\emph{Junior Management:}\\
			\simon\\
			\areti\\
			\luc\\
			~\\
			\emph{Senior Management:}\\
			\markbrand\\
			\lou\\
			~\\
			\emph{Technical Advisor:}\\
			\ion\\
			~\\
			\emph{Customer:}\\
			\patrick
			\end{flushright}
			\end{minipage}

			\vfill
			% Bottom
			{\large Eindhoven - \today}
		\end{center}
		\end{titlepage}
	}
\fi

% Fancy headers/footers
\RequirePackage{fancyhdr}
\setlength{\headheight}{13.6pt}
\fancypagestyle{firstpage}{%
	\fancyhf{} % clear all six fields
	\renewcommand{\headrulewidth}{0pt}
	\renewcommand{\footrulewidth}{0pt}
}
\fancypagestyle{followingpage}{%
	\fancyhf{} % clear all six fields
	\fancyhead[RE,LO]{\textbf{\MakeUppercase{\projectnameplain}}}
	\fancyhead[RO,LE]{\textbf{\uppercase{\leftmark}}}
	\fancyfoot[C]{\thepage}
	\renewcommand{\headrulewidth}{0.5pt}
	\renewcommand{\footrulewidth}{0pt}
}

\pagestyle{followingpage}
\AtBeginDocument{\thispagestyle{firstpage}}