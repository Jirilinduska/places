"use client";

import { Box, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import { borderRadius } from "@/constants/constants"
import { DashboardStats } from "./DashboardStats"
import { DashboardValues, IDashboardData, IPinsWithPopup } from "@/interfaces/interfaces"
import dynamic from "next/dynamic"
import type { AppMapProps } from "./AppMap"
import { DashboardPlaces } from "./DashboardPlaces"
import { DashboardSettings } from "./DashboardSettings"
import { useIsMobile } from "@/hooks/useIsMobile"
const AppMap = dynamic<AppMapProps>(
    () => import("./AppMap").then((mod) => mod.AppMap),
    { ssr: false }
  )


// 🗺️ 1️⃣ Mapový panel
// Centrování na poslední přidaný pin nebo “Home location”.

// --------------------------------


// 📊 2️⃣ Statistiky / přehled

// Top fotky / místa → nejvíce lajkovaná nebo komentovaná místa (pokud budeš rozšiřovat).


// 🧍‍♂️ 5️⃣ Personalizace
// UserButton / avatar → rychlé nastavení účtu nebo logout.

// Možnost nastavení mapy: satelitní/OSM, styl pinů.

type DashboardState = {
    loading: boolean
    value: DashboardValues
    mapCenter: [number, number]
    mapZoom: number
}

export const Dashboard = () => {

    const isMobile = useIsMobile()

    const [state, setState] = useState<DashboardState>({
        loading: false,
        value: "_stats_",
        mapCenter: [50.0755, 19.5378],
        mapZoom: 7
    })

    const [data, setData] = useState<IDashboardData>()
    const [pinsOnMap, setPinsOnMap] = useState<IPinsWithPopup[]>([])
    const [selectedPin, setSelectedPin] = useState<IPinsWithPopup | null>(null)
    const [isChange, setIsChange] = useState(1)

    const handleChange = (event: React.SyntheticEvent, newValue: DashboardValues) => {
        setState((prev) => ({...prev, value: newValue}))
    }

    const handleItemClick = (item: IPinsWithPopup) => {
        setSelectedPin(item)
        setState((prev) => (
            {   ...prev, 
                mapZoom: 12,
                mapCenter: [item.lat, item.lon]
            }))
    }
    
    // TODO - asi odstranit
    const toggleChange = () => setIsChange(prev => prev + 1)

    useEffect(() => {
        if(!data) return
        if(state.value === "_stats_") {
            setSelectedPin(null)
            setPinsOnMap(data.posts)
        }
        if(state.value === "_visited_") {
            const newArray = data.posts.filter(x => x.beenThere)
            setSelectedPin(null)
            setPinsOnMap(newArray)
        }
        if(state.value === "_want_visit_") {
            const newArray = data.posts.filter(x => !x.beenThere)
            setSelectedPin(null)
            setPinsOnMap(newArray)
        }
    }, [state.value])

    useEffect(() => {
        const fetchData = async() => {
            setState((prev) => ({...prev, loading: true}))
            try {
                const res = await fetch("/api/dashboard", { method: "GET" })
                const data = await res.json()
                setData(data)
                setPinsOnMap(data.posts)
            } catch (error) {
                console.log(error)
            } finally {
                setState((prev) => ({...prev, loading: false}))
            }
        }
        fetchData()
    }, [isChange])

  return (
    <Box minHeight="100vh" py={{ xs: 12, lg: 0 }} display="flex" alignItems="center" justifyContent="center" flexDirection="column">

        <Box border="2px solid black" width="95%" display="flex" justifyContent="space-between" sx={{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}>
            <Box width={{ xs: "100%", lg: "50%" }}>
                <Tabs value={state.value} onChange={handleChange}>
                    <Tab label="Stats" value="_stats_" />
                    <Tab label="Visited places" value="_visited_" />
                    <Tab label="Want visit" value="_want_visit_" />
                    {!isMobile && <Tab label="Settings" value="_settings_" />}
                </Tabs>
            </Box>
        </Box>
        
        <Box border="2px solid black" width="95%" display="flex" justifyContent="space-between"  flexDirection={{ xs: "column", lg: "row" }} sx={{ borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }}>
            
            <Box p={4} width={{ xs: "100%", lg: "50%" }} height={{ xs: "auto", lg: "600px" }}>

                {state.value === "_stats_" && (
                    <DashboardStats 
                        placesBeen={data?.placesBeen ?? null}
                        placesWantVisit={data?.placesWantVisit ?? null}
                        loading={state.loading}
                        placesBeenLastYear={data?.placesBeenLastYear ?? null}
                        placesBeenThisYear={data?.placesBeenThisYear ?? null}
                    />
                )}

                {/* // TODO - responzivita! */}
                {(state.value === "_visited_"  || state.value === "_want_visit_") && (
                    <DashboardPlaces 
                        loading={state.loading}
                        pinsOnMap={pinsOnMap}
                        dashboardValue={state.value}
                        onTitleClick={handleItemClick}
                    />
                )}

                {state.value === "_settings_" && <DashboardSettings loading={state.loading} toggleChange={toggleChange} />}

            </Box>

            <Box width={{ xs: "100%" }} bgcolor="black" overflow="hidden">
                <AppMap 
                    center={state.mapCenter} 
                    height="600px"
                    zoom={state.mapZoom}
                    pinsWithPopup={selectedPin ? [selectedPin] : pinsOnMap} 
                />
            </Box>
        </Box>

    </Box>
  );
};