import React from 'react';
import { HashLink } from 'react-router-hash-link';
import Partners from './../Partners';
import './pages-img.scss';

const Wctablet = () => {
  return (
    <div className="content">
      <main>
        <section id="win95">
          <h3>
            QEMU and mouse integration in Windows 95 and Windows 95 OSR2 <HashLink smooth to={`${location.pathname}#win95`}>
              <i className="fas fa-link"></i>
            </HashLink>
          </h3>
          

          <p>
            Special wctablet serial device supported by QEMU is able to bring mouse integration in the
            same way as “-usb-device tablet” (old way) and “-usb -device usb-tablet” (new way) do.
          </p>

          <p><b>Note:</b> It was noticed, that under QEMU 2.11 Windows 95 with serial tablet hangs and
            thus doesn’t work. In earlier and later versions everything is working. Windows 95 OSR2 works
            with mouse integration in all tested versions.</p>

          <p>
            <b>The following steps are needed to get mouse integration with Windows 95 and Windows 95 OSR2 running in
              QEMU:</b>
          </p>

          <ol>
            <li>
              You will need to install a driver for the Wacom PenPartner serial tabled. You can download
              the driver installation CD <a href="https://ia800107.us.archive.org/16/items/Wacom_Pen_Partner_Version_2.50_WACOM_1997/Wacom%20Pen%20Partner%20%28Version%202.50%29%28WACOM%29%281997%29.iso">here</a>
            </li>

            <li>
              Run your virtual machine with the downloaded ISO image in addition to your HDD image with Windows,
              and add two additional command line parameters. The first one will create a special character device
              with some arbitrary name you (e.g. “mywctablet1”). The second one will attach this character device
              to your serial (COM) port:
              <p><code>qemu-system-i386 -m 32 -hda image.qcow -cdrom Wacom\ Pen\ Partner\ \(Version\ 2.50\)\(WACOM\)\(1
                997\).iso -chardev wctablet,id=somename -serial chardev:somename</code></p>
            </li>

            <li>
              QEMU will use the new wctablet device to control your pointer, but Windows knows nothing about it yet.
              So use your keyboard (Tab, arrow keys and Enter) for navigaton. Open the needed folder in a file manager,
              run Setup.exe and proceed with the installation as follows:

              <div className="pages-img qemuCdrom1"></div>
              <div className="pages-img wacomSetup1"></div>

              <p>Now select <b>“Tablet Only”</b> (you may just press the <b>“O”</b> key to make it selected):</p>

              <div className="pages-img wacomSetupTablet"></div>
              
              <div className="pages-img wacomSetupSuccessful1"></div>
            </li>

            <li>
              Now there is one more step, which is needed only for Windows 95 (Windows 95 OSR2 works OK without it).
              When the installation is finished, you should close the installer and run it once again
              (otherwise driver may not work after reboot): 

              <div className="pages-img qemuCdrom2"></div>
              
              
              <div className="pages-img wacomSetup2"></div>
            
              
              <div className="pages-img wacomSetupSuccessful2"></div>
              

              <p>Now when you press “OK”, the Windows will restart and the driver will work. </p>
            </li>

            <li>
              You will have mouse integration each time when you run your virtual machine as follows:
              <p><code>qemu-system-i386 -m 32 -hda &#123;guest_system_img&#125; -chardev wctablet,id=somename -serial chardev:somename</code></p>
            </li>
          </ol>
        </section>

        <section id="win3x">
          <h3>
            QEMU and mouse integration in Windows 3.x <HashLink smooth to={`${location.pathname}#win3x`}>
            <i className="fas fa-link"></i>
          </HashLink>
          </h3>

          <p>
            Special wctablet serial device supported by QEMU is able to bring mouse integration in the
            same way as “-usb-device tablet” (old way) and “-usb -device usb-tablet” (new way) do.
          </p>

          <p>
            <b>The following steps are needed to get mouse integration with Windows 3.x running in QEMU:</b>
          </p>

          <ol>
            <li>
              You will need to install a driver for the Wacom PenPartner serial tabled. You can download
              the driver installation CD <a href="https://ia800107.us.archive.org/16/items/Wacom_Pen_Partner_Version_2.50_WACOM_1997/Wacom%20Pen%20Partner%20%28Version%202.50%29%28WACOM%29%281997%29.iso">here</a>
            </li>

            <li>
              Now you have to make files from this CD visible to the guest operating system.
              <p>
                A) If your Windows 3.x installation already has CD-ROM drivers, you can simply add
                <code>“-cdrom &lt;image.iso&gt;”</code>to the QEMU command line. If that-s not your case, adding CD-ROM
                DOS drivers
                is rather tricky, so it may be easier to follow the plan B:
              </p>

              <p>
                B) If you have no CD-ROM driver installed, it may be easier to mount your hard drive image to
                the host operating system and copy needed files from there. Following steps will mount your
                QCOW image to your host filesystem:
              </p>

              <ol>
                <li>
                  turn on NDB support:
                  <p><code>sudo modprobe nbd max_part=8</code></p>
                </li>


                <li>
                  attach your image as an NDB device:
                  <p><code>sudo qemu-nbd --connect=/dev/nbd0 &lt;image.qcow&gt;</code></p>
                </li>

                <li>
                  look at the partition table of your image to find which partition to mount:
                  <p><code>sudo fdisk /dev/nbd0 -l</code></p>
                </li>

                <div className="pages-img wctabletTerminal"></div>

                <li>
                  mount the needed partition to your host filesystem
                  (let’s suppose you are mounting your 1st partition to /mnt/):
                  <p><code>sudo mount /dev/nbd0p1 /mnt/</code></p>
                </li>


                <li>
                  copy files from the downloaded CD into your image. You can “unpack” ISO images
                  as archive. If you would like to save space, copy everything but the COREL folder
                  (the one which has nothing to do with the driver but is about 500 Mb in size).
                </li>


                <li>
                  Unmount the image and detach it from the NBD:
                  <p><code>sudo umount /dev/nbd0p1</code><br/>
                  <code>sudo qemu-nbd --disconnect /dev/nbd0</code></p>
                </li>
              </ol>
            </li>
          </ol>

          <ol start="3">
            <li>
              Run your virtual machine with two additional parameters. The first one will create
              a special character device with some arbitrary name you (e.g. “mywctablet1”).
              The second one will attach this character device to your serial (COM) port:
              <p><code>qemu-system-i386 -m 32 -hda image.qcow -chardev wctablet,id=mywctablet1 -serial chardev:mywctablet1</code></p>
              <p><b>Note:</b> don’t forget to add “<code>-cdrom &lt;image.iso&gt;</code>” to the
                QEMU command line if you will read driver from CD</p>
            </li>

            <li>
              QEMU will use the new wctablet device to control your pointer, but Windows knows
              nothing about it yet. So go to QEMU Monitor and switch your pointing device to mouse:
              <ol>
                <li>
                  Press Ctrl + Alt + 2, to go into the monitor:

                  <div className="pages-img wctabletTerminalQemu"></div>
                </li>

                <li>
                  Enter the “mouse_set 3” command to use ps/2 mouse (two other devices are your tablet and your keyboard).
                </li>

                <li>
                  Press Ctrl + Alt + 1 to switch back to your GUEST screen from QEMU monitor.
                </li>
              </ol>
            </li>
          </ol>

          <ol start="5">
            <li>
              When Windows have been booted, open the needed folder in a file manager:

              <div className="pages-img qemuFileManager"></div>
            </li>

            <li>
              Run <code>setup.exe</code> and follow the instructions:

              <div className="pages-img qemuWacomSetup1"></div>
              <div className="pages-img qemuWacomSetup2"></div>
            </li>

            <li>
              Reboot your system when the driver installation is finished.
            </li>

            <li>
              Now you will have mouse integration each time when you run your virtual machine as follows:
              <p><code>qemu-system-i386 -m 32 -hda image.qcow -chardev<br/> wctablet,id=somename -serial chardev:somename</code></p>
            </li>
          </ol>
        </section>

        <section id="wctablet">
          <h3>Legacy OS mouse integration <HashLink smooth to={`${location.pathname}#wctablet`}>
              <i className="fas fa-link"></i>
            </HashLink>
          </h3>

          <h4>Problem description</h4>

          <p>
            Running old-time OS in emulator often comes with a problem of non-coinciding cursors.
            This problem arises from the availability of two different types of cursor positioning devices:
            ones with relative coordinates (computer mice) and ones with absolute coordinates (tablets and
            touchscreens). Relative positioning devices provide operating system with the vector of
            the cursor movement instead of it's new coordinates, and as a result, different cursor
            acceleration formulas are breaking coincidence of host and guest systems cursor.
          </p>

          <p>
            Mainstream visualization systems (including QEMU) can emulate as relative pointing devices
            (PS/2 and serial mice), so an absolute pointing device (USB Wacom tablet in case of QEMU).
            Mode with absolute coordinates allows host cursor to control guest OS and is called “mouse
            integration mode” in desktop virtualization systems. But mouse integration is available only
            if guest OS either has special driver from the virtual machine vendor, or supports USB tablet.
            In all other situations desktop virtual machines use “mouse lock mode,” when host cursor is
            hidden until some dedicated hotkey is pressed, and user can interact with the guest system only.
            This mode is not only less convenient for operation, but it is usable for the web access to
            the virtualized system. So projects providing web demonstration of old operating systems have
            to show user two cursors moving with different speed:
          </p>

          <div className="pages-img osMouse"></div>

          <h3>Solution</h3>

          <p>
            Starting from version 1.9, QEMU implements emulation of the RS-232 Wacom tablet (wctablet)
            as an additional character device backend. Currently it is the only virtualization system with
            such capabilities.
          </p>

          <p>
            Guest OS still needs drivers for such tablet, which exist for DOS, OS/2, Windows 3.x and
            Windows 95, BeOS, Mac OS 9.x and Mac OS X, and some other systems.
          </p>

          <p>
            You can test how this feature works with our pre-configured Windows 3.11 image – just run
            it with the following command:
          </p>

          <p><code>qemu-system-i386 -m 32 -hda win311.qcow -chardev wctablet,id=wacom -serial chardev:wacom</code></p>

          <p>
            This ostimeline subproject was created as a hub for the information on how to find and install
            necessary drivers for the pre-USB operating systems to achieve mouse integration.
          </p>
        </section>
      </main>
      
      <Partners/>
    </div>
  )
}

export default Wctablet;
