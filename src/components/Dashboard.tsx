"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { borderRadius } from "@/constants/constants"
import { DashboardStats } from "./DashboardStats"
import { DrawerAddPlace } from "./DrawerAddPlace"
import { AppMap } from "./AppMap"
import { IDashboardData } from "@/interfaces/interfaces"


// 🗺️ 1️⃣ Mapový panel

// Interaktivní mapa hned nahoře (Leaflet + OSM).

// Piny všech uživatelem navštívených míst.

// Kliknutí na pin → modal s poznámkou + fotkami.

// Rychlé přidání pinu → tlačítko “Add place” nebo klik přímo na mapu.

// Centrování na poslední přidaný pin nebo “Home location”.

// --------------------------------


// 📊 2️⃣ Statistiky / přehled

// Počet navštívených míst (celkově, za měsíc, tento týden).

// Nejčastější kategorie nebo tagy (pokud přidáš tagy).

// Mapa heatmapy → kde nejvíce pinů.

// Graf trendu → kolik míst přidáno za poslední měsíc / rok.

// Top fotky / místa → nejvíce lajkovaná nebo komentovaná místa (pokud budeš rozšiřovat).

// --------------------------------



// ⚡ 3️⃣ Quick actions

// Add new place → modal s uploadem fotek + poznámkou.

// Search places → search bar (Nominatim API nebo filtrování seznamu míst).

// Export / share → tlačítko “Export my places” (PDF / JSON / map image).

// Filter pins → např. podle data, tagu nebo vzdálenosti.

// Navigate to last place → rychlé přiblížení mapy.

// --------------------------------




// 📰 4️⃣ Feed / timeline

// Poslední přidaná místa → karty s fotkami + poznámkou.

// Aktivity uživatele → “Přidal místo X” / “Nahrál fotku k Y”.

// Carousel fotek → přehled nejhezčích fotek.

// --------------------------------



// 🧍‍♂️ 5️⃣ Personalizace

// Přivítání: “Ahoj, [jméno]! Tady jsou tvoje navštívená místa”.

// UserButton / avatar → rychlé nastavení účtu nebo logout.

// Možnost nastavení mapy: satelitní/OSM, styl pinů.

export const Dashboard = () => {

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState<IDashboardData | null>(null)

    const [value, setValue] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try {
                const res = await fetch("/api/dashboard", { method: "GET" })
                const data = await res.json()
                setData(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column">

        <Box border="2px solid black" width="95%" display="flex" justifyContent="space-between" sx={{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}>

            <Box width={{ xs: "100%", lg: "50%" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Stats" />
                    <Tab label="Visited" />
                    <Tab label="Want visit" />
                    <Tab label="Settings" />
                </Tabs>
            </Box>

            <DrawerAddPlace />
        </Box>
        
        <Box border="2px solid black" width="95%" display="flex" justifyContent="space-between"  flexDirection={{ xs: "column", lg: "row" }} sx={{ borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }}>
            
            {data && <DashboardStats 
                placesBeen={data.placesBeen}
                placesWantVisit={data.placesWantVisit}
            />}

            <Box width={{ xs: "100%" }} bgcolor="black" overflow="hidden">
                <AppMap 
                    center={[50.0755, 14.4378]} 
                    height="600px"
                    zoom={13}
                    // pins={[[50.0755, 14.4378]]}
                    pinsWithPopup={data && data.posts || []} // TODO 
                />
            </Box>
        </Box>

    </Box>
  );
};