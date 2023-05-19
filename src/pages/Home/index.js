import * as React from 'react';
import { useSelector } from 'react-redux';
import Admin from './Admin';
import Client from './Client';




export default function Home() {
  const authId = useSelector((state) => state.authId);
 

  return (
      <div>
        {authId === 'sp58Fc7NE8eLm8aX0xCeszQ8oWq1' ?(
          <Admin />
        ):(
          <Client />
        )}
      </div>
  );
}
