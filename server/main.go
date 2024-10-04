package main

import (
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo/v5"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
    app := pocketbase.New()

    // serves static files from the provided public dir (if exists)
    app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
        e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))
        return nil
    })

    // docs: https://pocketbase.io/docs/go-routing/#registering-new-routes
    app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
        e.Router.GET("/api/biblemem/", func(c echo.Context) error {
            name := c.PathParam("name")
    
            return c.JSON(http.StatusOK, map[string]string{"message": "Hello " + name})
        }, /* optional middlewares */)
    
        return nil
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}