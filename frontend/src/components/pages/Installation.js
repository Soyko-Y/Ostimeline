import React from 'react';
import Partners from './../Partners';
import { Page } from './Page';

const Installation = () => {
  return (
    <div className="content">
      <main>
        <section>
          <Page pageName="installation" />
        </section>
      </main>

      <Partners />
    </div>
  )
}

export default Installation;
