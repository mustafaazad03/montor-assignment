import Image from "next/image";
import React from "react";

interface Icon {
	icon: string;
	alt: string;
}

const IconButton = ({ icon, alt }: Icon) => {
	return (
		<button>
			<Image
				src={icon}
				width={100}
				height={100}
				alt={alt}
				className="w-7 h-7"
			/>
		</button>
	);
};

export default IconButton;
