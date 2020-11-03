import React from 'react';
import Partners from './../Partners';
import '../../App.css';

const Gstreamer = () => {
  return (
    <div className="content">
      <section>
        <h3 className="title">Virtual machine as a multimedia codec</h3>

        <p>
          Among the drawbacks of the HTML based virtual machines demo one can note the lack of
          monolithicity: content with virtualized environments is essentially a complex system
          that functions as a single interactive document thanks to a set of scripts and independent
          software components. However, its deployment and transfer to other systems is complicated
          enough to perceive such a “document” as an independent unit, in comparison with traditional
          documents containing animations and video.
        </p>

        <p>
          To overcome this drawback, an alternative approach is examined here, which allows to interpret
          the image of a virtual machine (with a guest OS inside of it) as a “multimedia file” played by
          a “codec” using a virtualization system (QEMU). At first glance, this decision may seem unobvious.
          However, interactive elements have been present in media files for a long time (e.g. a DVD menu).
          Therefore, the architecture of existing video playback systems has the ability to react on user
          actions.
        </p>

        <p>
          The experimental implementation was built a plugin of the GStreamer multimedia framework:
        </p>

        <img alt="GStreamer architecture" src="../../../public/images/gstreamer_architecture" />

        <p>
          The developed plugin performs the following functions:
        </p>

        <ul>
          <li>Output of the guest OS screen image to the media player;</li>
          <li>Connection to QEMU through a socket;</li>
          <li>registration of the user-generated events (mouse movements and keystrokes)
            of the user and their sending to the QEMU monitor.</li>
        </ul>

        <p>
          The QEMU image format Qcow 2 is registered in the system as another MIME type.
          In this case, it is required to store the exact QEMU launch command with all parameters
          of the virtual machine inside the image file (external launch scripts cannot be attached
          to a "multimedia" file). For this, we use our own extension of the QEMU image format.
        </p>
      </section>
      
      <Partners/>
    </div>
  )
}

export default Gstreamer;
