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

To enable it, make sure **CSM is disabled**. On brand new systems it should be, but just to be on the safe side. Then, **enable both "Above 4G Decoding" and "Resizable BAR"** (sometimes also called SAM). You will also have to enable support for it in the GPU driver, more on that in a [later section](#resizable-bar-1).

## ErP

Having tons of lights and making your PC light up like a christmas tree sure looks nice while the system is running, but can be very distracting when it's not in use. You probably don't want rainbow road, or any light at all for that matter, when sleeping in the room your PC is sitting in. To eliminate even the slightest shimmer of LEDs and making your system consequently consume <1 W while powered off, **enable ErP**.

{% admonition(type="warning", title="Warning") %}
Because this will turn off the network card while shut-down, <abbr title="Wake on LAN">WOL</abbr> will stop functioning. If you want to use that feature, ErP will not be your one-stop-solution.
{% end %}

## Fan Curve

## Boot Times

memory context/ultra fast boot

# Windows

## Drivers

### GPU

#### Adaptive Sync

#### Latency Reduction

#### Resizable BAR

### Chipset, Network, Audio, ...

## Monitor Settings

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
