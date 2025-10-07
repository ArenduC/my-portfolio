import React from 'react';
import { AngularIcon } from './icons/AngularIcon';
import { BlenderIcon } from './icons/BlenderIcon';
import { FigmaIcon } from './icons/FigmaIcon';
import { FlutterIcon } from './icons/FlutterIcon';
import { ReactIcon } from './icons/ReactIcon';

const IconWrapper = ({ children, href, name }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="relative bg-[#3c3c39] rounded-full p-3 transition-transform hover:scale-110 cursor-pointer group">
    {children}
    {/* Tooltip */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
      {name}
      {/* Tooltip Arrow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
    </div>
  </a>
);

const skills = [
    { name: "Flutter", component: FlutterIcon, href: "https://flutter.dev/" },
    { name: "React", component: ReactIcon, href: "https://react.dev/" },
    { name: "Angular", component: AngularIcon, href: "https://angular.io/" },
    { name: "Figma", component: FigmaIcon, href: "https://www.figma.com/" },
    { name: "Blender", component: BlenderIcon, href: "https://www.blender.org/" },
];

const Skills: React.FC = () => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Technical Skills</h3>
            <div className="flex flex-wrap justify-center items-start gap-4 md:gap-6">
                {skills.map((skill, index) => (
                    <IconWrapper key={index} href={skill.href} name={skill.name}>
                        <skill.component className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </IconWrapper>
                ))}
            </div>
        </div>
    );
};

export default Skills;