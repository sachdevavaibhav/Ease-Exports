import React from "react";

export default function List ({items, keyName, ItemComponent, ...props}) {
	return (
		<div className="List">
			{ items.map( 
					item => <ItemComponent {...{ [keyName]: item }} key={item.id} /> 
				) 
			}	
		</div>
	)
}