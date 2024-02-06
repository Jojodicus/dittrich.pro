+++
title = "Setting up a fresh Windows Installation"
date = "2023-12-28"
description = "Things to do after installing Windows on a gaming PC. Some more, some less important..."
[taxonomies]
tags = ["pc", "software"]
[extra]
cover_image = "images/windows-glow.jpg"
+++

<!-- [Deutsche Version](@/setting-up-windows.de.md) -->

You've built your brand new gaming PC and installed Windows as your operating system. But now you want to actually use it for its intended purpose and set it up to your liking. In this guide, we will go over the most important settings for a smooth gaming experience. And consequently, about things you should ideally avoid.

Keep in mind this is all based on my personal opinion. If you feel like something is wrong or missing, feel free to contact me!

# UEFI Settings

The first few settings are in the UEFI (historically and colloquially sometimes called BIOS) of your mainboard. The UEFI firmware runs one level under the <abbr title="operating system">OS</abbr> itself, so its settings are not tied to it. Rather, they are kept on a separate chip (often called the CMOS) and will prevail across different installations of OSs.

When working within the UEFI, it's often recommended to have the matching manual open for reference, either as a book or digitally on a phone or second PC/Laptop. The manual often provides even more information about specific settings and where to find them, as the builtin explanations and search functions are typically rather lacking. If your mainboard didn't come with a physical copy, you can find the digital version on the website of your mainboard's manufacturer (i.e. Asus, MSI, ...). The manual will also include on how to get into the UEFI in the first place, as different brands have different keybinds for it. The most common one, however, is by spamming <kbd>Insert</kbd> while booting.

## XMP

XMP, like its derivatives EXPO and DOCP, is a predefined overclocking configuration for your RAM. After installing your RAM and booting for the first time, it will most likely not run at its advertised speeds, but at the default JEDEC-specification, often 2133 MTs for ddr4 and 4800 MTs for ddr5 respectively. To run at advertised speeds, **enable XMP** in the UEFI.

{% admonition(type="info", title="Info") %}
When checking your RAM speed with third-party programs, you will sometimes find a frequency of half of the selected transfer speed (i.e. 3000 MHz for 6000 MTs). This is because DDR memory initiates two transfers for each clock cycle.
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

The first stop will be drivers. Normally, an OS should manage these for us, with manual intervention only being necessary if something breaks or performs poorly. Most drivers are provided by Windows Update and are tested to be stable under almost all operating conditions. For this reason, Windows ships driver updates very conservatively, as mismatching versions can break programs in subtle and hard to notice ways, more on that [later](#driver-boosters).

### GPU

Pretty much the only driver where we want to trade stability for the most up-to-date performance is the graphics driver. Even when going up a single driver version, performance in games can improve drastically. The specialized driver can also provide additional settings and features, such as [Variable Refresh Rate](#vrr) or [Latency Reduction](#latency-reduction), which we will cover shortly.

The installation steps depend on your dedicated GPU:

- NVIDIA: [nvidia.com/download](https://www.nvidia.com/download)
- AMD: [amd.com/support](https://www.amd.com/support)
- Intel: [intel.com/.../drivers.html](https://www.intel.com/content/www/us/en/products/docs/discrete-gpus/arc/software/drivers.html)

{% admonition(type="info", title="Info") %}
For typical usage, I don't recommend downloading the beta drivers. They give up too much stability for experimental and sometimes detrimental changes, so stick to the normal versions.
{% end %}

#### VRR

![An example of heavy screen tearing](/images/screen-tearing.jpg)

You've probably heard of Variable Refresh Rate under the marketing names NVIDIA G-Sync, AMD FreeSync or the general term Adaptive Sync. Although the names are different, they essentially all do the same thing: sync your monitor's refresh rate to the game's frame rate. This has the advantage of completely eliminating screen tearing, while also keeping input latency down.

To enable the feature, you will need a compatible monitor with the feature enabled in its <abbr title="On Screen Display">OSD</abbr>. Then, head over into your GPU driver and find a setting called **G-Sync, FreeSync or Adaptive Sync and enable it**.

{% admonition(type="info", title="Info") %}
Keep in mind that Adaptive Sync will only work if your frame rate is below your refresh rate. Above that, it does nothing.
{% end %}

{% admonition(type="warning", title="Warning") %}
VRR can sometimes interfere with HDR and <abbr title="Black Frame Insertion">BFI</abbr> blur reduction. Check your monitor's manual and choose settings fitting to your preferences.
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

Outside of the graphics driver, we can also check settings within the Windows display settings itself.

### Resolution and Refresh Rate

Especially when using monitors with high refresh rate, Windows sometimes fails to recognize this and defaults to something slower like 60 Hz. To check wether you are using the full capabilities of your monitor, head over into the display settings and check that both **resolution and refresh rate is set to the maximum**. Refresh rate is hidden under advanced settings for each monitor.

### HDR

![SDR vs HDR](/images/sdr-hdr.webp)

Some monitors have support for HDR, providing very bright highlights for content that supports it. With modern games doing so, you can often get a nice visual upgrade for no noticeable performance cost. To use it, you will again first have to **enable it within the <abbr title="On Screen Display">OSD</abbr>**. After that, the option should appear and work with supported games. For content on the normal desktop, Windows provides an option called Auto HDR. Turn it on and see if you like it, there is always the option of turning it off afterwards.

{% admonition(type="warning", title="Warning") %}
Using HDR can sometimes interfere with VRR or <abbr title="Black Frame Insertion">BFI</abbr> blur reduction. Check your monitor's manual and choose settings fitting to your preferences.
{% end %}

## Autostart

When trying to optimize Windows for performance, the main goal is reducing the number of running background processes. Some people even focus so much on this, they end up breaking their system completely for negligible gains, more on that [later](#things-you-should-not-do). Something you can and should do, however, is cleaning up your autostart from unneeded programs.

To do so, open up Task Manager (which has the keybind <kbd><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Esc</kbd></kbd>) and go to the autostart tab. Sort by status and disable every program you don't need started automatically and running in the background. When in doubt about specific programs, leave them as is. Some notable things the average person can disable are: Teams, OneDrive and Spotify.

## Game Mode

This should be turned on by default, but it can be good to double check within Windows Settings. When enabled, this feature will prioritize game instances and turn off background routines like driver updates or sending restart notifications. Since it's from Windows itself, you won't have to worry about breaking things like with third-party game boosters.

## TRIM

Again, this should already be enabled when having an SSD in your system. TRIM is a feature of SSDs where data is marked unused on the drive. For best performance, due to how SSDs work, this is not done immediately when deleting files, but done in batches once in a while. This can essentially be thought of as the SSD equivalent of defragmentation, which was used for HDDs. Because these are closely related, they share the same setting, called Defragment and Optimize Drives. In this menu, select your SSDs and **check if scheduled optimization is turned on**.

## Sticky Keys

This can be something very annoying, especially in clutch situations. Windows has an accessability feature, where by quickly pressing one of <kbd>Ctrl</kbd>, <kbd>Alt</kbd>, <kbd>Shift</kbd> or <kbd>Win</kbd> keys 5 times, it will act as though the key is pressed continuously and make an annoying sound for good measure. To prevent this, **turn off Sticky Keys in the Accessability Settings**.

## Enhanced Pointer Precision

Similarly, enhanced pointer precision, or better known as mouse acceleration, can also be something quite annoying. When playing games, you ideally want the mouse acceleration completely flat, such that the same distance covered on the mouse mat always equals the same distance turned in game, regardless of how fast you move your mouse. Enhanced pointer precision works against that, increasing sensitivity the faster you move, which can mess with muscle memory. This isn't as relevant nowadays, since most games use raw input anyways and thus circumvent the pointer options from Windows. Some games, like Minecraft, don't do this though, so it's commonly advised to turn the setting of anyways. To do so, **open the mouse tab in Windows Settings, then click on "Additional mouse options". Under the Pointer Options tab, uncheck "Enhance pointer precision"**.

## Telemetry

If you didn't opt out of Microsoft's data collection during the installation, you should do that now. Telemetry only brings disadvantages to the user, running in the background and reducing privacy by sending usage data to Microsoft. To turn it off, go to the **Privacy and Security tab within Windows Settings** and disable everything mentioning data collection.

{% admonition(type="warning", title="Warning") %}
Disabling the underlying services completely is heavily discouraged, as this might break your system with future updates, or prevent you from receiving updates at all.
{% end %}

## Software

The next section will be about software for daily use. Keep in mind that only you yourself are responsible for the things you install on your system. Never install things from unknown sources or with questionable reputation.

### Web Browser

Probably the one third-party program used the most. This is also a reason why the choice of which web browser to use should be carefully considered. In general, you want a good performing browser with good compatibility, which won't sell your data to outsiders. My personal recommendations include:

- [Brave](https://brave.com/)
- [Firefox](https://www.mozilla.org/en-US/firefox/new/)
- [Mullvad](https://mullvad.net/en/download/browser/windows), also a good VPN provider
- [Librewolf](https://librewolf.net/)
- [Waterfox](https://www.waterfox.net/)
- [Ungoogled Chromium](https://ungoogled-software.github.io/)

Because of privacy concerns, the usage of mainstream browsers like Edge, Chrome or especially Opera is heavily discouraged. Even though the latter one might look tempting for an aspiring gaming enthusiast, think about what is actually behind the seemingly innocent program:

{{ youtube(id="bNrAn1LzaWg?si=7H_IbJuwGtPx2u3Z", class="youtube") }} (auto-generated subtitles available)

As for plug-ins/extensions, an adblocker like [uBlock](https://github.com/gorhill/uBlock) is advised. [Sponsorblock](https://sponsor.ajay.app/) is also a nice addition when watching a lot of YouTube.

### RGB Software

Although they might look pretty nice, RGB lights essentially only provide disadvantages for gaming PCs: more power draw, distracting and, when controlling them with software, always one potentially hungry background process more. Especially when combining multiple ecosystems of lights from different manufacturers, the burden of using multiple (potentially conflicting) programs just to change the color animations can be pretty big. If your hardware supports it, try using a universal software like [OpenRGB](https://openrgb.org/) or [SignalRGB](https://signalrgb.com/), or even better: don't use RGB in the first place.

### Wallpaper

To avoid messy interpolation, choose a wallpaper with the exact resolution of your monitors (or an integer multiple of that). Or if that's not possible, simply the highest resolution wallpaper you can find.

{% admonition(type="example", title="Example") %}
If you have two 2560x1440 monitors side by side, either look for 5120x1440 images or 2560x1440 (or a multiple like 5120x2880) if you want the same wallpaper on both monitors.
{% end %}

Usage of animated wallpapers along the lines of Wallpaper Engine or Lively is discouraged, especially when using more than one display. This is because in order to render the animation, it can hog system resources which are then not available to get the best gaming performance. Normally, the animation should stop when a game is started or the wallpaper is blocked by other windows, but this can't be relied on. It will also heavily increase idle power consumption, as the system is always busy rendering, even on the desktop with no programs open.

# Things you should *not* do

Speaking of things you should avoid, the following section is dedicated to exactly that. These are things often mentioned by so called "Optimization Guides", but are in reality detrimental to your system's stability and can lead to very hard to find issues in the long run.

## MSConfig

MSConfig is primarily used as a troubleshooting tool when a system is not booting correctly. It is *not* meant for permanent changes. When doing so, it can hinder system performance or even make it refuse to boot at all, either now or later down the line.

Some people think that changing the number of processors in the advanced boot option will somehow make the PC faster. This couldn't be further from the truth. Windows is already using all available CPU cores. Changing something here can only *disable* cores, which we definitely don't want.

Messing with the startup services is also a pretty fast way to brick your system. The performance gain when disabling things is negligible at best and, at worst, can make your system unbootable. Messing with things here might seem just fine now, but can cause major issues after a few OS updates.

## Driver Boosters

As mentioned [above](#drivers), Windows already manages almost everything for us. Using tools that ruthlessly update every available driver can cause major incompatibilities with version mismatches or lead to degraded stability. You will likely also not see any performance improvement from newer drivers. The only exception is the graphics driver, which we've [already taken care of](#gpu).

## Cleaners

Another thing that can do more harm than good are "cleaners", like CCleaner. Back in the day, using them was almost mandatory, as Windows was not good at cleaning up after itself. Over the last decade, this has changed massively. Deleting temporary files today will neither significantly free up storage, nor make your system faster. Quite the opposite: those temporary files are used as caches for often or likely used/computed data. Deleting them will force Windows to load this data again, resulting in worse performance.

Something similar can be said about cleaning up the Registry. Although the Registry is an arguably outdated way of storing configurations, messing with it can lead to corrupt and unfixable systems, again either now or later. The performance benefit of a "clean" Registry is also borderline unmeasurable, so it's definitely not worth risking.

## Third-party Antivirus

Not particularly related to performance, but rather security. Using a third-party antivirus is not advised in the current day. There are multiple reasons for this:

1. Windows already has a built-in antivirus: Windows Defender
2. Though seeming counterintuitive, historically providing more surface for an attack vector
3. Potential spyware with no form of regulation, as it runs with the highest privileges
4. Still not protecting you from unknown threats (0-day-exploits)

Antivirus is something you don't want to rely on. Use your own brain, don't click on fishy links or download untrusted software. The following video sums it up nicely:

{{ youtube(id="ZxzvHXT0NXw?si=lp0q_dMK3Pl8f_uM", class="youtube") }} (subtitles available)

## Power Plans

Changing the Power Plan from the balanced default to high performance can actually be something that impacts performance in very specific scenarios. Those being, when the CPU has to transition fast between P-States. What the high performance Power Plan essentially does, is making your CPU never go into an idle state, always running as if it was utilized 100%. This has a huge drawback though: idle and low-usage power consumption is increased by 4x or even more. Do your power bill a favor and leave this setting on balanced, especially since you likely won't benefit from the improvements during gaming anyway.

## Disabling Services

This is closely related to disabling startup services in [MSConfig](#msconfig). These also play a vital part in the core functionality of Windows and can lead to major problems when messing with them. It's not worth risking stability and integrity, especially when you don't know exactly what you are doing.

## Tweakers

These tools basically combine everything mentioned earlier, including both beneficial and detrimental changes. Often providing a nice gui where you can "optimize", or often rather break, your system within only a few clicks. These modifications can also include something very dangerous, like disabling Windows Security entirely, leaving you with neither a firewall nor antivirus. Mitigations against <abbr title="Side Channel Attack">SCA</abbr>s like Meltdown or Spectre are also often disabled, making your system even more vulnerable against borderline undetectable attacks. Changes also regularly include the disabling of updates, both feature and security. As you've probably guessed, usage of said tweakers is heavily discouraged.

This also includes custom ISOs along the lines of AtlasOS or similar. They basically include these tweaks pre-applied. With custom ISOs, you are 100% dependent on the ISO provider and are sometimes even prohibited from changing settings within the OS yourself. Even worse, there is also the possibility of preinstalled malware like keyloggers or reverse shells for botnets. Distributing modified versions of Windows is illegal and [can net some serious jail time](https://www.polygon.com/windows/2018/4/25/17280178/eric-lundgren-windows-restore-disks-microsoft-prison). You can decide for yourself if someone is willing to break the law just for people to only get a "clean" version of Windows. But don't complain if your credentials get stolen.
