    -- Lua features a quirky syntax. The syntax looks similar
    -- to Ruby but Lua's is more rigid.

    -- Single-line comments begin with --

    --[[
       Block comments can be done like this.
    ]]--

    -- Statements are almost always separated by line breaks.
    local one = 1
    local two = 2

    -- In some cases the line break may be omitted, usually
    -- only when a keyword makes it possible. For example, this
    if one == 1 then
        return
    end

    -- Can be shortened to
    if one == 1 then return end
