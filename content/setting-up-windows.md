+++
title = "Setting up a fresh Windows Installation"
date = "2023-12-28"
description = "Things to do after installing Windows on a gaming PC. Some more, some less important..."
[taxonomies]
tags = ["pc", "software"]
[extra]
cover_image = "images/windows-glow.jpg"
+++

[Deutsche Version](@/setting-up-windows.de.md)

(in progress)

So you've built your brand new gaming PC and installed Windows as your operating system. Great, but now you want to actually use it for its intended purpose and set it up to your liking. In this guide, we will go over the most important settings for a smooth gaming experience. And consequently, about things you should ideally avoid.

Keep in mind this is all based on my personal opinion. If you feel like something is wrong or missing, feel free to contact me!

# UEFI Settings

The first few settings are in the UEFI (historically and colloquially sometimes called BIOS) of your mainboard. The UEFI firmware runs one level under the <abbr title="operating system">OS</abbr> itself, so its settings are not tied to it. Rather, they are kept on a separate chip (often called the CMOS) and will prevail across different installations of OSs.

When working within the UEFI, it's often recommended to have the matching manual open for reference, either as a book or digitally on a phone or second PC/Laptop. The manual often provides even more information about specific settings and where to find them, as the builtin explanations and search functions are typically rather lacking. If your mainboard didn't come with a physical copy, you can find the digital version on the website of your mainboard's manufacturer (i.e. Asus, MSI, ...). The manual will also include on how to get into the UEFI in the first place, as different brands have different keybinds for it. The most common one, however, is by spamming <kbd>Insert</kbd> while booting.

## XMP

XMP, like its derivatives EXPO and DOCP, is a predefined overclocking configuration for your RAM. After installing your RAM and booting for the first time, it will most likely not run at its advertised speeds, but at the default JEDEC-specification, often 2133 MTs for ddr4 and 4800 MTs for ddr5 respectively. To run at advertised speeds, **enable XMP** in the UEFI.

{% admonition(type="info", title="Info") %}
When checking your RAM speed with third party programs, you will sometimes find a frequency of half of the selected transfer speed (i.e. 3000 MHz for 6000 MTs). This is because DDR memory initiates two transfers for each clock cycle.
{% end %}

## Resizable BAR

Normally, a CPU can only access the graphic card's VRAM in 256 MB blocks at a time. This can become a bottleneck when trying to upload multiple gigabytes worth of textures. With Resizable BAR, you can essentially make the visible block as large as the whole available VRAM, improving performance depending on the game.

To enable it, make sure **CSM is disabled**. On brand new systems it should be, but just to be on the safe side. Then, **enable both Above 4G Decoding and Resizable BAR** (sometimes also called SAM). You will also have to enable support for it in the GPU driver, more on that in a [later section](#resizable-bar-1).

## ErP

Having tons of lights and making your PC light up like a christmas tree sure looks nice while the system is running, but can be very distracting when it's not in use. You probably don't want rainbow road, or any light at all for that matter, when sleeping in the room your PC is sitting in. To eliminate even the slightest shimmer of LEDs and making your system consequently consume <1 W while powered off, **enable ErP**.

{% admonition(type="warning", title="Warning") %}
Because this will turn off the network card while shut-down, <abbr title="Wake on LAN">WOL</abbr> will stop functioning. If you want to use that feature, ErP won't be your one-stop-solution.
{% end %}

## Fan Curve

![An example fan curve](/images/fan-curve.png)

Changing the fan speed is typically done in the UEFI as well. Deviating from the default settings can result in better thermal or acoustic performance, depending on the goal. For day-to-day activities, you probably want your system to operate as silently as possible, so dropping down your CPU cooler's RPM for low temperatures (<50 °C) to almost inaudible levels is often a good idea. For case fans, I personally like to run them statically at the noise-floor as well.

For some fans, like USB connected models from Corsair or Lian Li, they have to be controlled via a special software in Windows. GPU fan curves also have to be configured this way, either in the driver itself or with external tools like [MSI Afterburner](https://www.msi.com/Landing/afterburner/graphics-cards).

Keep in mind that there is no one-fits-all fan curve for every system. Even single units of the same fan model can behave differently from one another, so individual experimentation is advised. Also, a fan curve won't magically improve both thermals and noise. Except for special cases (i.e. fans rattling at specific RPMs) you can only trade one for the other, the key is having a smooth transition between both for your typical workloads.

## Boot Times

Especially with the now common DDR5 memory, boot times have increased drastically, sometimes even to one minute or longer. This is because of something called RAM training: When trying to load the timing profile of the RAM, only the voltage, clock frequency and primary timings are set. But because every kit behaves differently, the secondary and tertiary timings each have to be found individually. This is done during <abbr title="Power On Self Test">POST</abbr> and can take multiple minutes of rebooting depending on the configuration. After finding suitable settings, some boards also continue to try and find even better subtimings with consecutive boots. Or they don't keep track of previously found settings at all by default, leading to long training times every boot.

Most boards have an optional setting to mitigate this: By **enabling the MRC or Memory Context**, we can essentially save the memory parameters for previous boots and don't initiate any further training attempts. Depending on the platform and mainboard manufacturer, this can have different names. Some examples include Memory Context Restore, MRC Fast Boot or Memory Fast Boot.

# Windows

Now that we're out of the UEFI, we can further focus on programs and settings within Windows itself.

## Drivers

The first stop will be drivers. Normally, an OS should manage these for us, with manual intervention only being necessary if something breaks or performs poorly. Most drivers are provided by Windows Update and are tested to be stable under almost all operating conditions. For this reason, Windows ships driver updates very conservatively, as mismatching versions can break programs in subtle and hard to notice ways.

### GPU

Pretty much the only driver where we want to trade stability for the most up-to-date performance is the graphics driver. Even when going up a single driver version, performance in games can improve drastically. The specialized driver can also provide additional settings and features, such as [Adaptive Sync](#adaptive-sync) or [Latency Reduction](#latency-reduction), which we will cover shortly.

The installation steps depend on your dedicated GPU:

- NVIDIA: [nvidia.com/download](https://www.nvidia.com/download)
- AMD: [amd.com/support](https://www.amd.com/support)
- Intel: [intel.com/.../drivers.html](https://www.intel.com/content/www/us/en/products/docs/discrete-gpus/arc/software/drivers.html)

{% admonition(type="info", title="Info") %}
For typical usage, I don't recommend downloading the beta drivers. They give up too much stability for experimental and sometimes detrimental changes, so stick to the normal versions.
{% end %}

#### Adaptive Sync

You've probably heard of this under the marketing names NVIDIA G-Sync and AMD FreeSync. Although the names are different, they essentially all do the same thing: sync your monitor's refresh rate to the game's frame rate. This has the advantage of completely eliminating screen tearing, while also keeping input latency down.

![An example of heavy screen tearing](/images/screen-tearing.jpg)

To enable the feature, you will need a compatible monitor with the feature enabled in its <abbr title="On Screen Display">OSD</abbr>. Then, head over into your GPU driver and find a setting called **G-Sync, FreeSync or Adaptive Sync and enable it**.

{% admonition(type="info", title="Info") %}
Keep in mind that Adaptive Sync will only work if your frame rate is below your refresh rate. Above that, it does nothing.
{% end %}

#### Latency Reduction

Another part where you can sink hours into is trying to find the optimal settings for the lowest input lag. If you really want to dive in deep into the topic, I can recommend the YouTube channel [BattleNonSense](https://www.youtube.com/@BattleNonSense), where he tests and compares different methods and their impact on input latency.

{{ youtube(id="K_k1mjDeVEo?si=HXHJuDoxdp85D2dI", class="youtube") }}

The video above will go into a lot more details about how each of these technologies works, but for a one-stop-solution, **enabling NVIDIA Reflex in games or AMD Anti-Lag+ in the driver** is the easiest method for a near-perfect result.

#### Resizable BAR

As [previously mentioned](#resizable-bar), we have to enable this setting on the driver-level as well. So search for **Resizable Bar or SAM and enable it**.

### Chipset, Network, Audio, ...

All other necessary drivers should theoretically be installed automatically. If something appears to be not working right, or you want to use the optional features of a specific driver, there is still the option of downloading the driver from your mainboard's website (often under the Support tab).

This can sometimes be especially important for relatively new <abbr title="Network Interface Controller">NIC</abbr>s or WIFI cards, where Windows does not ship its own drivers yet. Because the PC can't connect to the internet, they also can't be downloaded via Windows Update. In that case, you will need to download the driver from another system onto a USB stick, or use USB tethering via a phone for internet access. After getting the driver onto your PC and installing it, the remaining default drivers should be downloaded and installed automatically.

## Display Settings

### Resolution and Refresh Rate

### HDR

## Autostart

(teams, onedrive, spotify, etc)

## Game Mode

## TRIM

## Sticky Keys

## Telemetry

## Software

### Web Browser

(brave, firefox, ..., mullvad, librewolf, waterfox, ungoogled chromium) - no opera

### Office Suite

free - onlyoffice

### Wallpaper

# Things you should *not* do

## Driver Boosters

## Cleaners

ccleaner etc

## Tweakers

diabling firewall/defender/mitigations, includes custom iso

## Third-party Antivirus

## Power Plans

use balanced

## Disabling Services
